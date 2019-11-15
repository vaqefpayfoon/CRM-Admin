using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.BaseInformation
{
    public interface ISupcustGoodRepository : IBaseRepository
    {
        Task<IEnumerable<SupcustGood>> GetSupcustGood(Guid productId, Guid supcustId);
        Task<SupcustGood> GetSupcustGood(Guid id);
        Task<IEnumerable<SupcustGood>> GetSupcustGoods();    
        Task<IEnumerable<SupcustGood>> GetSupcustGoods(Guid supcustId);
        Task<IEnumerable<SupcustGood>> GetSupcustGoods(string supcust);
        Guid SupcustGuid(string supcustName);
        Guid ProductGuid(string productName);
        Task<bool> Exists(Guid productId, Guid supcustId, string barcode, string serial);
    }
}