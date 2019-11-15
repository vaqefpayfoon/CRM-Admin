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
    public class SupcustGoodController : ControllerBase
    {
        private readonly ISupcustGoodRepository _repo;
        private readonly IMapper _mapper;
        public SupcustGoodController (ISupcustGoodRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("saveSupcustGood")]
        public async Task<IActionResult> saveSupcustGood(SupcustGoodDto model)
        {            
            model.SupcustId = _repo.SupcustGuid(model.SupcustName);
            model.ProductId = _repo.ProductGuid(model.ProductName);
            
            if(await _repo.Exists(model.ProductId, model.SupcustId, model.Barcode, model.Serial))
                return BadRequest("this already assigned");

            SupcustGood SupcustGoodCreate = _mapper.Map<SupcustGood>(model);

            _repo.Add(SupcustGoodCreate);
            if (await _repo.SaveAll())
                return Ok(new {id = SupcustGoodCreate.Id});

            throw new Exception($"Save SupcustGood {model.SupcustName} failed on save");
        }
        [HttpPost("updateSupcustGood")]
        public async Task<IActionResult> UpdateSupcustGood(SupcustGoodDto model)
        {
            SupcustGood supcustGood = await _repo.GetSupcustGood(model.Id);
            _mapper.Map(model, supcustGood);
            if (await _repo.SaveAll())
                return Ok(supcustGood);

            throw new Exception($"Updating SupcustGood {model.Id} failed on save");            
        }
        [HttpPost("deleteSupcustGood")]
        public async Task<IActionResult> DeleteSupcustGood(StringModel name) 
        {        
            SupcustGood supcustGood = await _repo.GetSupcustGood(name.Id);

            _repo.Delete(supcustGood);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this SupcustGood");
        }
        [HttpGet("getSupcustGood")]
        public async Task<IActionResult> getSupcustGood(string supcustId, string productId) 
        {        
            var supcustGuid = _repo.SupcustGuid(supcustId);
            var productGuid = _repo.ProductGuid(productId);

            IEnumerable<SupcustGood> supcustGood = await _repo.GetSupcustGood(supcustGuid, productGuid);
            IEnumerable<SupcustGoodDto> supcustGoodDto = _mapper.Map<IEnumerable<SupcustGoodDto>>(supcustGood);
            return Ok(supcustGoodDto);
        }
        [HttpGet("getSupcustGoodId")]
        public async Task<IActionResult> getSupcustGoodId(string id) 
        {        
            SupcustGood supcustGood = await _repo.GetSupcustGood(new Guid(id));
            SupcustGoodDto supcustGoodDto = _mapper.Map<SupcustGoodDto>(supcustGood);
            return Ok(supcustGoodDto);
        }
        [HttpGet("getSupcustGoods")]
        public async Task<IActionResult> getSupcustGoods(string supcustId) 
        {        
            IEnumerable<SupcustGood> supcustGoods = await _repo.GetSupcustGoods(new Guid(supcustId));
            SupcustGoodDto supcustGoodDto = _mapper.Map<SupcustGoodDto>(supcustGoods);
            return Ok(supcustGoodDto);
        }
                [AllowAnonymous]
        [HttpGet("filteredProducts")]
        public async Task<IActionResult> FilteredProducts(string supcust) 
        {        
            IEnumerable<SupcustGood> products = await _repo.GetSupcustGoods(supcust);
            IEnumerable<SupcustGoodDto> output = _mapper.Map<IEnumerable<SupcustGoodDto>>(products);
            //IEnumerable<string> productName = products.Select(a => a.Product.ProductName);
            //string output = JsonConvert.SerializeObject(productName);
            return Ok (output);
        }
    }
}