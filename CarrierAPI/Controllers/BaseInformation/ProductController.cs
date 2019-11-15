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
    [Route ("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {        
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        public ProductController (IProductRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("default")]
        public IActionResult Default(StringModel str)
        {
            return Ok("we got the message" + str.Name);
        }
        [HttpPost("saveProduct")]
        public async Task<IActionResult> SaveProduct(ProductRegisterDto model)
        {
            model.ProductName = model.ProductName.ToLower();
            if (await _repo.Exists(model.ProductName))
                return BadRequest("Product already exists");

            Product productToCreate = _mapper.Map<Product>(model);

            _repo.Add(productToCreate);
            if (await _repo.SaveAll())
                return Ok(new {id = productToCreate.Id});

            throw new Exception($"Save Product {model.ProductName} failed on save");
        }
        [HttpPost("updateProduct")]
        public async Task<IActionResult> UpdateProduct(ProductRegisterDto model)
        {
            var product = await _repo.GetProduct(model.Id);
            _mapper.Map(model, product);
            if (await _repo.SaveAll())
                return Ok(product);

            throw new Exception($"Updating product {model.Id} failed on save");
            
        }
        [HttpPost("deleteProduct")]
        public async Task<IActionResult> DeleteProduct(StringModel name) 
        {        
            Product product = await _repo.GetProduct(name.Name);

            _repo.Delete(product);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this product");
        }
        [HttpGet("getProduct")]
        public async Task<IActionResult> GetProduct(string key, string field) 
        {        
            Product product;
            if(field.Equals("name"))
                product = await _repo.GetProduct(key);
            else
                product = await _repo.GetProduct(new System.Guid(key));
            ProductRegisterDto productDto = _mapper.Map<ProductRegisterDto>(product);
            return Ok(new {productDto = productDto});
        }
        [AllowAnonymous]
        [HttpGet("filteredProducts")]
        public async Task<IActionResult> FilteredProducts(string key) 
        {        
            var products = await _repo.GetProducts(key);
            IEnumerable<string> productName = products.Select(a => a.ProductName);
            string output = JsonConvert.SerializeObject(productName);
            return Ok (output);
        }
    }
}