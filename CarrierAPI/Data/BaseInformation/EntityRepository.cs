using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.BaseInformation 
{
    public class EntityRepository : IEntityRepository {
        private readonly DataContext _context;
        public EntityRepository (DataContext context) 
        {
            _context = context;
        }
        public void Add<T> (T entity) where T : class {
            _context.Add(entity);
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove(entity);
        }

        public async Task<IEnumerable<City>> GetCities() 
        {
            return await _context.Cities.Include(c => c.Country).ToListAsync();
        }
        public async Task<IEnumerable<City>> GetCities (string name) 
        {
            return await _context.Cities.Where(woak => woak.CityName.ToLower().Contains(name.ToLower())).ToListAsync();
        }
        public async Task<IEnumerable<Country>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }
        public async Task<IEnumerable<Country>> GetCountries(string name)
        {
            return await _context.Countries.Where(woak => woak.CountryName.ToLower()
            .Contains(name.ToLower())).ToListAsync();
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public Guid CountryGuid(string countryName)
        {
            return  _context.Countries.FirstOrDefault(woak => woak.CountryName == countryName).Id;
        }
        public async Task<bool> CountryExists(string countryName)
        {
            if (await _context.Countries.AnyAsync(x => x.CountryName == countryName))
                return true;

            return false;
        }
        public Guid CityGuid(string cityName)
        {
            return  _context.Cities.FirstOrDefault(woak => woak.CityName == cityName).Id;
        }
        public async Task<bool> CityExists(string cityName)
        {
            if (await _context.Cities.AnyAsync(x => x.CityName == cityName))
                return true;

            return false;
        }
    }
}