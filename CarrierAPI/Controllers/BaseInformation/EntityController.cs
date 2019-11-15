using System.Threading.Tasks;
using CarrierAPI.Data.BaseInformation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;
using CarrierDomain.Models;
using CarrierAPI.Dtos;
using AutoMapper;
using System;

namespace CarrierAPI.Controllers.BaseInformation 
{
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class EntityController : ControllerBase 
    {
        private readonly IEntityRepository _repo;
        private readonly IMapper _mapper;
        public EntityController (IEntityRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult<string> GetValues()
        {
            return "vaqef";
        }
        [HttpGet("GetCities")]
        public async Task<IActionResult> GetCities() 
        {        
            var cities = await _repo.GetCities();
            return Ok (cities);
        }
        [HttpGet("GetCity")]
        public async Task<IActionResult> GetCity(string key, string field) 
        {        
            var cities = await _repo.GetCities();
            City city;
            if(field.Equals("name"))
                city = cities.FirstOrDefault(woak => woak.CityName == key);
            else
                city = cities.FirstOrDefault(woak => woak.Id == new System.Guid(key));
            CityDto cityDto = _mapper.Map<CityDto>(city);
            return Ok(cityDto);
        }
        [HttpGet("GetCountry")]
        public async Task<IActionResult> GetCountry(string key, string field) 
        {        
            var countries = await _repo.GetCountries();
            Country country;
            if(field.Equals("name"))
                country = countries.FirstOrDefault(woak => woak.CountryName == key);
            else
                country = countries.FirstOrDefault(woak => woak.Id == new System.Guid(key));
            return Ok(country);
        }
        [HttpGet("filteredCities")]
        public async Task<IActionResult> FilteredCities(string key) 
        {        
            var cities = await _repo.GetCities(key);
            //IEnumerable<City> CityName = cities.Select(a => new City{Id = a.Id, CityName = a.CityName});
            IEnumerable<string> CityName = cities.Select(a => a.CityName);
            string output = JsonConvert.SerializeObject(CityName);
            return Ok (output);
        }
        [HttpGet("GetCountries")]
        public async Task<IActionResult> GetCountries() 
        {        
            var countries = await _repo.GetCountries();
            return Ok (countries);
        }
        [HttpGet("filteredCountries")]
        public async Task<IActionResult> FilteredCountries(string key) 
        {        
            var countries = await _repo.GetCountries(key);
            IEnumerable<string> CountryName = countries.Select(a => a.CountryName);
            string output = JsonConvert.SerializeObject(CountryName);
            return Ok (output);
        }
        [HttpPost("saveCity")]
        public async Task<IActionResult> SaveCity(CityDto cityDto) 
        {        
            if(await _repo.CityExists(cityDto.CityName))
                return BadRequest("This city Exsist appearntly");
            cityDto.CountryId = _repo.CountryGuid(cityDto.CountryName);
            City city = _mapper.Map<City>(cityDto);
            _repo.Add(city);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't save this city");
        }
        [HttpPost("saveCountry")]
        public async Task<IActionResult> SaveCountry(Country country) 
        {        
            if(await _repo.CountryExists(country.CountryName))
                return BadRequest("This country Exsist appearntly");

            _repo.Add(country);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't save this _country");
        }
        [HttpPost("updateCity")]
        public async Task<IActionResult> UpdateCity(CityDto cityDto) 
        {        
            cityDto.CountryId = _repo.CountryGuid(cityDto.CountryName);

            var cities = await _repo.GetCities();
            City city = cities.FirstOrDefault(woak => woak.Id == cityDto.Id);

            _mapper.Map(cityDto, city);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't save this city");
        }
        [HttpPost("updateCountry")]
        public async Task<IActionResult> UpdateCountry(Country country) 
        {        
            var countries = await _repo.GetCountries();
            Country _country = countries.FirstOrDefault(woak => woak.Id == country.Id);
            _country.CountryName = country.CountryName;
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception();
        }
        [HttpPost("deleteCity")]
        public async Task<IActionResult> deleteCity(StringModel name) 
        {        
            var cityId = _repo.CityGuid(name.Name);

            var cities = await _repo.GetCities();
            City city = cities.FirstOrDefault(woak => woak.Id == cityId);

            _repo.Delete(city);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this city");
        }
        [HttpPost("deleteCountry")]
        public async Task<IActionResult> DeleteCountry(StringModel name) 
        {        
            var countryId = _repo.CountryGuid(name.Name);

            var countries = await _repo.GetCountries();
            Country country = countries.FirstOrDefault(woak => woak.Id == countryId);

            _repo.Delete(country);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this country");
        }
    }
}