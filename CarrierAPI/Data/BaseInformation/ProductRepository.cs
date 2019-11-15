using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.BaseInformation
{
    public class ProductRepository : IProductRepository
    {
        private DataContext _context;
        public ProductRepository(DataContext context)
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
            if (await _context.Products.AnyAsync(x => x.ProductName == name))
                return true;
            return false;
        }

        public async Task<Product> GetProduct(string productName)
        {
            return await _context.Products.FirstOrDefaultAsync(woak => woak.ProductName == productName);
        }
        public async Task<Product> GetProduct(Guid id)
        {
            return await _context.Products.FirstOrDefaultAsync(woak => woak.Id == id);
        }
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }
        public async Task<IEnumerable<Product>> GetProducts(string name)
        {
            return await _context.Products.Where(woak => woak.ProductName.ToLower()
            .Contains(name.ToLower())).ToListAsync();
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public Guid SupcustGuid(string supcustName)
        {
            return  _context.Supcusts.FirstOrDefault(woak => woak.SupcustName == supcustName).Id;
        }
    }
}