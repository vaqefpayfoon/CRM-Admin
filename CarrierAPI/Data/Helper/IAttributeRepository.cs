using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.Helper
{
    public interface IAttributeRepository : IBaseRepository
    {
        Task<ModelsAttribute> GetModelsAttribute(Guid id);
        Task<ModelsAttribute> GetModelsAttribute(Guid relateObjectId, string name);
        Task<IEnumerable<ModelsAttribute>> GetModelsAttributes(Guid relateObjectId);
    }
    
}