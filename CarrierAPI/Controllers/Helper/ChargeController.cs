using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CarrierAPI.Data.Helper;
using CarrierAPI.Dtos;
using CarrierAPI.Helpers;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarrierAPI.Controllers.Helper
{
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ChargeController : ControllerBase
    {
        private readonly IChargeRepository _repo;
        private readonly IMapper _mapper;
        public ChargeController (IChargeRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("default")]
        public IActionResult Default(StringModel str)
        {
            return Ok("we got the message" + str.Name);
        }
        [HttpGet("getCharge")]
        public async Task<IActionResult> GetCharge(StringModel id) 
        {        
            Charge charge = await _repo.GetCharge(id.Id);
            return Ok(charge);
        }
        [HttpGet("getCharges")]
        public async Task<IActionResult> GetCharges([FromQuery]UserParams userParams) 
        {       
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault();
            var nameid = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.NameIdentifier)
                .Select(c => c.Value).FirstOrDefault();

            PagedList<Charge> charge = await _repo.GetUserCharges(userParams, new Guid(nameid), roles);
            IEnumerable<ChargeDto> chargeDto;
            chargeDto = _mapper.Map<IEnumerable<ChargeDto>>(charge);

            Response.AddPagination(charge.CurrentPage, charge.PageSize,
                charge.TotalCount, charge.TotalPages);

            return Ok(chargeDto);
        }
        [HttpPost("saveCharge")]
        public async Task<IActionResult> saveCharge(ChargeDto model)
        {
            model.CityId = _repo.GetCityGuid(model.CityName);
            model.UserId = _repo.GetUserGuid(model.UserName);

            Charge charge = _mapper.Map<Charge>(model);
            _repo.Add(charge);
            if (await _repo.SaveAll())
                return Ok(new {id = model.Id});

            throw new Exception($"Save ProjectType {model.Id} failed on save");
        }
        [HttpPost("updateCharge")]
        public async Task<IActionResult> updateCharge(ChargeDto model)
        {
            model.CityId = _repo.GetCityGuid(model.CityName);
            model.UserId = _repo.GetUserGuid(model.UserName);
            Charge charge = await _repo.GetCharge(model.Id);
            _mapper.Map(model, charge);

            if (await _repo.SaveAll())
                return Ok(charge);

            throw new Exception($"Updating ProjectType {model.Id} failed on save");
            
        }
        [HttpPost("deleteProjectType")]
        public async Task<IActionResult> DeleteProjectType(StringModel name) 
        {        
            Charge charge = await _repo.GetCharge(name.Id);

            _repo.Delete(charge);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this ProjectType");
        }
    }
}