using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierAPI.Helpers;
using CarrierDomain.Models;

namespace CarrierAPI.Data.Helper
{
    public interface IChargeRepository : IBaseRepository
    {
        Task<Charge> GetCharge(Guid id);
        Task<PagedList<Charge>> GetUserCharges(UserParams userParams, Guid userId, string role);
        Guid GetUserGuid(string name);
        Guid GetCityGuid(string name);
    }
}