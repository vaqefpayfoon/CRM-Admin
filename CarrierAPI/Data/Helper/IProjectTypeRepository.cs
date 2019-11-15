using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.Helper
{
    public interface IProjectTypeRepository : IBaseRepository
    {
        Task<ProjectType> GetProjectType(Guid id);
        Task<ProjectType> GetProjectType(string name);
        Task<IEnumerable<ProjectType>> GetProjectTypes(string name, string role);
    }
}