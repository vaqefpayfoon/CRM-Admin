using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.BaseInformation
{
    public class SupcustGoodRepository : ISupcustGoodRepository
    {
        private DataContext _context { get; }
        public SupcustGoodRepository(DataContext context)
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
        public async Task<SupcustGood> GetSupcustGood(Guid id)
        {
            return await _context.SupcustGoods.Include(s => s.Supcust).Include(p => p.Product)
            .FirstOrDefaultAsync(woak => woak.Id == id);
        }
        public async Task<IEnumerable<SupcustGood>> GetSupcustGood(Guid supcustId, Guid productId)
        {
            return await _context.SupcustGoods.Include(s => s.Supcust).Include(p => p.Product).Where(woak => woak.ProductId == productId && woak.SupcustId == supcustId).ToListAsync();
        }

        public async Task<IEnumerable<SupcustGood>> GetSupcustGoods()
        {
            return await _context.SupcustGoods.Include(s => s.Supcust).Include(p => p.Product).ToListAsync();
        }

        public async Task<IEnumerable<SupcustGood>> GetSupcustGoods(Guid supcustId)
        {
            return await _context.SupcustGoods.Include(s => s.Supcust).Include(p => p.Product).Where(woak => woak.SupcustId == supcustId).ToListAsync();
        }

        public Guid ProductGuid(string productName)
        {
            return  _context.Products.FirstOrDefault(woak => woak.ProductName == productName).Id;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public Guid SupcustGuid(string supcustName)
        {
            return  _context.Supcusts.FirstOrDefault(woak => woak.SupcustName == supcustName).Id;
        }

        public async Task<bool> Exists(Guid productId, Guid supcustId, string barcode, string serial)
        {
            return await _context.SupcustGoods.AnyAsync(woak => woak.SupcustId == supcustId
             && woak.ProductId == productId && (woak.Barcode == barcode || woak.Serial == serial));
        }
        public async Task<IEnumerable<SupcustGood>> GetSupcustGoods(string supcust)
        {
            return await _context.SupcustGoods.Include(s => s.Supcust).Include(p => p.Product).Where(woak =>
            woak.Supcust.SupcustName.ToLower().Contains(supcust.ToLower())).ToListAsync();
        }
    }
}