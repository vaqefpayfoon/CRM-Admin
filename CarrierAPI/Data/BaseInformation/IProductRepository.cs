using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.BaseInformation
{
    public interface IProductRepository : IBaseRepository
    {
        Task<Product> GetProduct(string productName);
        Task<Product> GetProduct(Guid id);
        Task<IEnumerable<Product>> GetProducts();    
        Task<IEnumerable<Product>> GetProducts(string name);
        Guid SupcustGuid(string supcustName);
    }
}