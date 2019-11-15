using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierAPI.Helpers;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.Helper
{
    public class ChargeRepository : IChargeRepository
    {
        private DataContext _context;
        public ChargeRepository(DataContext context)
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

        public Task<bool> Exists(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<Charge> GetCharge(Guid id)
        {
            return await _context.Charges.Include(u => u.User).Include(c => c.City).Include(d => d.ChargeDetails).FirstOrDefaultAsync(woak => woak.Id == id);
        }

        public async Task<PagedList<Charge>> GetUserCharges(UserParams userParams, Guid userId, string role)
        {            
            Role convertedRole = (Role)Enum.Parse(typeof(Role), role);
            IQueryable<Charge> results = null;
            switch(convertedRole)
            {
                case Role.FullAccess :
                {
                    results = _context.Charges.Include(s  => s.User).Include(p => p.City).
                    Include(c => c.ChargeDetails).AsQueryable();
                }
                break;
                case Role.SalesAdmin :
                {
                    results = _context.Charges.Include(u => u.User).Include(p => p.City).Include(c => c.ChargeDetails).Where(woak => woak.User.UserRole == Role.Sales || woak.User.UserRole == Role.SalesAdmin).AsQueryable();
                }
                break;
                case Role.ServiceAdmin :
                {
                    results = _context.Charges.Include(u => u.User).Include(p => p.City).Include(c => c.ChargeDetails)
                    .Where(woak => woak.User.UserRole == Role.Service || woak.User.UserRole == Role.ServiceAdmin).AsQueryable();
                }
                break;
                case Role.Sales :
                {
                    results = _context.Charges.Include(u => u.User).Include(p => p.City).Include(c => c.ChargeDetails).Where(woak => woak.UserId == userId).AsQueryable();
                }
                break;case Role.Service :
                {
                    results = _context.Charges.Include(u => u.User).Include(c  => c.City).Where(woak => 
                        woak.UserId == userId).AsQueryable();
                }
                break;
            }
            return await PagedList<Charge>.CreateAsync(results, userParams.PageNumber, userParams.PageSize);
        
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public Guid GetUserGuid(string name)
        {
            return _context.Users.FirstOrDefault(woak => woak.Username == name).Id;
        }
        public Guid GetCityGuid(string name)
        {
            return _context.Cities.FirstOrDefault(woak => woak.CityName == name).Id;
        }
    }
}