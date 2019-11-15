using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.BaseInformation
{
    public interface ISupcustRepository : IBaseRepository
    {
        Task<Supcust> GetSupcust(string supcustName);
        Task<Supcust> GetSupcust(Guid id);
        Task<IEnumerable<Supcust>> GetSupcusts();
        Task<IEnumerable<Supcust>> GetSupcusts(string name);
        Guid CityGuid(string cityName);
    }
}