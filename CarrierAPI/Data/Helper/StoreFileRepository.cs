using System;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.Helper
{
    public class StoreFileRepository : IStoreFileRepository
    {
        private readonly DataContext _context;
        public StoreFileRepository (DataContext context) 
        {
            _context = context;
        }
        public void Add<T> (T entity) where T : class {
            _context.Add(entity);
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove(entity);
        }

        public Task<bool> Exists(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<StoreFile> GetFile(Guid id)
        {
            return await _context.FileStores.FirstOrDefaultAsync(woak => woak.RelatedObjectId == id);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}