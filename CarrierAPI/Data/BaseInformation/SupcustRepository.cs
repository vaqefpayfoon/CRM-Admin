using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.BaseInformation
{
    public class SupcustRepository : ISupcustRepository
    {
        private DataContext _context { get; }
        public SupcustRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> Exists(string name)
        {
            if (await _context.Supcusts.AnyAsync(x => x.SupcustName == name))
                return true;
            return false;
        }

        public async Task<Supcust> GetSupcust(string supcustName)
        {
            return await _context.Supcusts.Include(woak => woak.City).FirstOrDefaultAsync(woak => woak.SupcustName == supcustName);
        }
        public async Task<Supcust> GetSupcust(Guid id)
        {
            return await _context.Supcusts.Include(woak => woak.City).FirstOrDefaultAsync(woak => woak.Id == id);
        }
        public async Task<IEnumerable<Supcust>> GetSupcusts()
        {
            return await _context.Supcusts.ToListAsync();
        }
        public async Task<IEnumerable<Supcust>> GetSupcusts(string name)
        {
            return await _context.Supcusts.Where(woak => woak.SupcustName.ToLower()
            .Contains(name.ToLower())).ToListAsync();
        }
        public Guid CityGuid(string cityName)
        {
            return  _context.Cities.FirstOrDefault(woak => woak.CityName == cityName).Id;
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}