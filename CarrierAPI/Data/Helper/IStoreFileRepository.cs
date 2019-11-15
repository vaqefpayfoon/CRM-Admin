using System;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.Helper
{
    public interface IStoreFileRepository : IBaseRepository
    {
        Task<StoreFile> GetFile(Guid id);
    }
}