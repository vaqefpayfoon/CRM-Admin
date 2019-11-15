using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CarrierAPI.Data.Helper;
using CarrierAPI.Dtos;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarrierAPI.Controllers.Helper
{
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ChargeDetailController : ControllerBase
    {
        private readonly IChargeDetailRepository _repo;
        private readonly IMapper _mapper;
        public ChargeDetailController (IChargeDetailRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("default")]
        public IActionResult Default(StringModel str)
        {
            return Ok("we got the message" + str.Name);
        }
        [HttpGet("getChargeDetail")]
        public async Task<IActionResult> getChargeDetail(StringModel id) 
        {        
            ChargeDetail chargeDetail = await _repo.GetChargeDetail(id.Id);
            return Ok(chargeDetail);
        }
        [HttpGet("getChargeDetails")]
        public async Task<IActionResult> getChargeDetails(StringModel id) 
        {        
            IEnumerable<ChargeDetail> chargeDetails = await _repo.GetChargeDetails(id.Id);
            return Ok(chargeDetails);
        }
        [HttpPost("saveChargeDetail")]
        public async Task<IActionResult> saveChargeDetail(ChargeDetail model)
        {
            _repo.Add(model);
            if (await _repo.SaveAll())
                return Ok(new {id = model.Id});

            throw new Exception($"Save ProjectType {model.Id} failed on save");
        }
        [HttpPost("updateCharge")]
        public async Task<IActionResult> updateCharge(ChargeDetail model)
        {
            ChargeDetail chargeDetail = await _repo.GetChargeDetail(model.Id);          
                        
            chargeDetail.Amount = model.Amount;
            chargeDetail.ChargeId = model.ChargeId;
            chargeDetail.Chargetype = model.Chargetype;
            chargeDetail.MoreInfo = model.MoreInfo;            
             
            if (await _repo.SaveAll())
                return Ok(model);

            throw new Exception($"Updating ProjectType {model.Id} failed on save");
            
        }
        [HttpPost("deleteProjectType")]
        public async Task<IActionResult> DeleteProjectType(StringModel name) 
        {        
            ChargeDetail chargeDetail = await _repo.GetChargeDetail(name.Id);

            _repo.Delete(chargeDetail);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this ProjectType");
        }
    }
}