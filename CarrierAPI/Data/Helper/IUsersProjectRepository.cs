using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierAPI.Helpers;
using CarrierDomain.Models;

namespace CarrierAPI.Data.Helper
{
    public interface IUsersProjectRepository : IBaseRepository
    {
        Task<UsersProject> GetUsersProject(Guid id);
        Task<UsersProject> GetUsersProject(Guid projectTypeId, Guid supcustId, Guid ProductId, Guid userId);
        Guid GetProjectTypeGuid(string name);
        Guid GetProductGuid(string name);
        Guid GetSupcustGuid(string name);
        Guid GetUserGuid(string name);
        Task<IEnumerable<UsersProject>> GetUsersProjects(Guid relateObjectId, string type);
        Task<PagedList<UsersProject>> GetUsersProjects(UserParams userParams, string role, string nameid);
        Task<IEnumerable<double>> GetProjectsProfit();
    }
}