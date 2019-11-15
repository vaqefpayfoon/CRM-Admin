using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.BaseInformation
{
    public interface IEntityRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<City>> GetCities();
         Task<IEnumerable<City>> GetCities(string name);
         Task<IEnumerable<Country>> GetCountries();
         Task<IEnumerable<Country>> GetCountries(string name);
         Guid CountryGuid(string cityName);
         Guid CityGuid(string cityName);
         Task<bool> CountryExists(string countryname);
         Task<bool> CityExists(string cityName);
    }
}