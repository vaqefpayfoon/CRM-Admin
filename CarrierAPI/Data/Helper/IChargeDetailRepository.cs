using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.Helper
{
    public interface IChargeDetailRepository : IBaseRepository
    {
        Task<ChargeDetail> GetChargeDetail(Guid id);
        Task<IEnumerable<ChargeDetail>> GetChargeDetails(Guid chargeId);
    }
}