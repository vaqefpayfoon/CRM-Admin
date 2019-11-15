using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CarrierAPI.Data.Helper;
using CarrierAPI.Dtos;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarrierAPI.Controllers.Helper
{
    [Route ("api/[controller]")]
    [ApiController]
    public class AttributeController : ControllerBase
    {
        private readonly IAttributeRepository _repo;
        private readonly IMapper _mapper;
        public AttributeController (IAttributeRepository repo, IMapper mapper) 
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
            return Ok(new StringModel(){Name = "we got the message"});
        }
        [HttpGet("getAttributes")]
        public async Task<IActionResult> GetAttributes([FromQuery] string id)
        {
            IEnumerable<ModelsAttribute> attributes = await _repo.GetModelsAttributes(new Guid(id));
            IEnumerable<AttributeDto> attributeDto = _mapper.Map<IEnumerable<AttributeDto>>(attributes);
            
            return Ok(attributeDto);
        }
        [HttpPost("saveAttribute")]
        public async Task<IActionResult> SaveAttribute([FromBody] List<ModelsAttribute> model)
        {            
            foreach(ModelsAttribute Woak in model)
            {
                if(string.IsNullOrEmpty(Woak.AttributeName) || string.IsNullOrEmpty(Woak.AttributeValue)) return BadRequest();
                ModelsAttribute attribute = await _repo.GetModelsAttribute(Woak.RelatedObjectId, Woak.AttributeName);
                if(attribute != null)
                {
                    attribute.AttributeName = Woak.AttributeName;
                    attribute.AttributeValue = Woak.AttributeValue;
                }
                else
                    _repo.Add(Woak);
            }
            if (await _repo.SaveAll())
                return Ok("all attribute saved");

            throw new Exception($"Save Attribute {model[0].AttributeName} failed on save");
        }
        [HttpPost("updateAttribute")]
        public async Task<IActionResult> UpdateAttribute(ModelsAttribute model)
        {
            ModelsAttribute attribute = await _repo.GetModelsAttribute(model.RelatedObjectId, model.AttributeName);
            attribute.AttributeName = model.AttributeName;
            attribute.AttributeValue = model.AttributeValue;
            if (await _repo.SaveAll())
                return Ok(attribute);

            throw new Exception($"Updating Attribute {model.Id} failed on save");
            
        }
        [HttpPost("deleteAttribute")]
        public async Task<IActionResult> DeleteAttribute(StringModel name) 
        {        
            if(name.Id == null || string.IsNullOrEmpty(name.Name)) return BadRequest();
            ModelsAttribute attribute = await _repo.GetModelsAttribute(name.Id, name.Name);

            _repo.Delete(attribute);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this Attribute");
        }
    }
}