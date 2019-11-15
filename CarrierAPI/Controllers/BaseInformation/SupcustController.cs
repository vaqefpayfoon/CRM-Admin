using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CarrierAPI.Data.BaseInformation;
using CarrierAPI.Dtos;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CarrierAPI.Controllers.BaseInformation
{
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class SupcustController : ControllerBase 
    {
        private readonly ISupcustRepository _repo;
        private readonly IMapper _mapper;
        public SupcustController (ISupcustRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("default")]
        public IActionResult Default(StringModel str)
        {
            return Ok("we got the message" + str.Name);
        }
        [HttpGet("default")]
        public IActionResult Default()
        {
            return Ok("we got the message");
        }
        [HttpPost("saveSupcust")]
        public async Task<IActionResult> SaveSupcust(SupcustRegisterDto model)
        {
            model.SupcustName = model.SupcustName.ToLower();
            model.CityId = _repo.CityGuid(model.CityName);
            if (await _repo.Exists(model.SupcustName))
                return BadRequest("Supcust already exists");

            Supcust supcustToCreate = _mapper.Map<Supcust>(model);

            _repo.Add(supcustToCreate);
            if (await _repo.SaveAll())
                return Ok(new {id = supcustToCreate.Id});

            throw new Exception($"Save Supcust {model.SupcustName} failed on save");
        }
        [HttpPost("updateSupcust")]
        public async Task<IActionResult> UpdateSupcust(SupcustRegisterDto model)
        {
            model.CityId = _repo.CityGuid(model.CityName);
            var supcust = await _repo.GetSupcust(model.Id);
            _mapper.Map(model, supcust);
            if (await _repo.SaveAll())
                return Ok(supcust);

            throw new Exception($"Updating Supcust {model.Id} failed on save");            
        }
        [HttpPost("deleteSupcust")]
        public async Task<IActionResult> DeleteSupcust(StringModel name) 
        {        
            Supcust supcust = await _repo.GetSupcust(name.Name);

            _repo.Delete(supcust);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this Supcust");
        }
        [HttpGet("getSupcust")]
        public async Task<IActionResult> GetSupcust(string key, string field) 
        {        
            Supcust Supcust;
            if(field.Equals("name"))
                Supcust = await _repo.GetSupcust(key);
            else
                Supcust = await _repo.GetSupcust(new System.Guid(key));
            SupcustRegisterDto SupcustDto = _mapper.Map<SupcustRegisterDto>(Supcust);
            return Ok(new {SupcustDto = SupcustDto});
        }
        [AllowAnonymous]
        [HttpGet("filteredSupcusts")]
        public async Task<IActionResult> FilteredSupcusts(string key) 
        {        
            var Supcusts = await _repo.GetSupcusts(key);
            IEnumerable<string> supcustName = Supcusts.Select(a => a.SupcustName);
            string output = JsonConvert.SerializeObject(supcustName);
            return Ok (output);
        }
    }
}