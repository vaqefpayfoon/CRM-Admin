using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.Helper
{
    public class ChargeDetailRepository : IChargeDetailRepository
    {        
        private DataContext _context;
        public ChargeDetailRepository(DataContext context)
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

        public async Task<ChargeDetail> GetChargeDetail(Guid id)
        {
            return await _context.ChargeDetails.FindAsync(id);
        }

        public async Task<IEnumerable<ChargeDetail>> GetChargeDetails(Guid chargeId)
        {
            return await _context.ChargeDetails.Where(woak => woak.ChargeId == chargeId).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}