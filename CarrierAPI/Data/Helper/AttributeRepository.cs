using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.Helper
{
    public class AttributeRepository : IAttributeRepository
    {
        private readonly DataContext _context;
        public AttributeRepository (DataContext context) 
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
        public async Task<ModelsAttribute> GetModelsAttribute(Guid id)
        {
            return await _context.ModelsAttributes.FirstOrDefaultAsync(woak => woak.Id == id);
        }
        public async Task<ModelsAttribute> GetModelsAttribute(Guid relatedObjectId, string name)
        {
            return await _context.ModelsAttributes.FirstOrDefaultAsync(woak => woak.RelatedObjectId == relatedObjectId
                && woak.AttributeName == name);
        }
        public async Task<IEnumerable<ModelsAttribute>> GetModelsAttributes(Guid relatedObjectId)
        {
            return await _context.ModelsAttributes.Where(woak => woak.RelatedObjectId == relatedObjectId).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}