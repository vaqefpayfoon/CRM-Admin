using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierAPI.Helpers;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.Helper
{
    public class UsersProjectRepository : IUsersProjectRepository
    {
        private DataContext _context { get; set; }
        public UsersProjectRepository(DataContext context)
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

        public Guid GetProductGuid(string name)
        {
            return _context.Products.FirstOrDefault(woak => woak.ProductName == name).Id;
        }

        public Guid GetProjectTypeGuid(string name)
        {
            return  _context.ProjectTypes.FirstOrDefault(woak => woak.ProjectTitle == name).Id;
        }

        public Guid GetSupcustGuid(string name)
        {
            return _context.Supcusts.FirstOrDefault(woak => woak.SupcustName == name).Id;
        }

        public Guid GetUserGuid(string name)
        {
            return _context.Users.FirstOrDefault(woak => woak.Username == name).Id;
        }

        public async Task<UsersProject> GetUsersProject(Guid id)
        {
            //return await _context.UsersProjects.FindAsync(id);
            return await _context.UsersProjects.Include(pt => pt.ProjectType).Include(s => s.Supcust)
            .Include(p => p.Product).Include(u => u.User)
            .FirstOrDefaultAsync(woak => woak.Id == id);
        }
        public async Task<UsersProject> GetUsersProject(Guid projectTypeId, Guid supcustId, Guid ProductId, Guid userId)
        {
            return await _context.UsersProjects.FirstOrDefaultAsync(Woak => Woak.ProjectTypeId == projectTypeId && Woak.SupcustId == supcustId && Woak.ProductId == ProductId && Woak.UserId == userId);
        }

        public async Task<IEnumerable<UsersProject>> GetUsersProjects(Guid relateObjectId, string type)
        {
            IEnumerable<UsersProject> results = null;
            switch(type)
            {
                case "supcust":
                results = await _context.UsersProjects.Where(woak => woak.SupcustId == relateObjectId).ToListAsync();
                break;
                case "product":
                results = await _context.UsersProjects.Where(woak => woak.ProductId == relateObjectId).ToListAsync();
                break;
                case "user":
                results = await _context.UsersProjects.Where(woak => woak.UserId == relateObjectId).ToListAsync();
                break;
                case "projectType":
                results = await _context.UsersProjects.Where(woak => woak.ProjectTypeId == relateObjectId).ToListAsync();
                break;
                case "adminUser":
                results = await _context.UsersProjects.Where(woak => woak.AdminUserId == relateObjectId).ToListAsync();
                break;
            }
            return results;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<PagedList<UsersProject>> GetUsersProjects(UserParams userParams, string role, string nameid)
        {
            Role convertedRole = (Role)Enum.Parse(typeof(Role), role);
            IQueryable<UsersProject> results = null;
            switch(convertedRole)
            {
                case Role.FullAccess :
                {
                    results = _context.UsersProjects.Include(u => u.User).Include(s  => s.Supcust).Include(p => p.Product)
                    .Include(c => c.ProjectType).AsQueryable();
                }
                break;
                case Role.SalesAdmin :
                {
                    results = _context.UsersProjects.Include(u => u.User).Include(s  => s.Supcust).Include(p => p.Product)
                        .Include(c => c.ProjectType).Where(woak => 
                        woak.ProjectType.RoleState == Role.Sales || woak.ProjectType.RoleState == Role.SalesAdmin).AsQueryable();
                }
                break;
                case Role.ServiceAdmin :
                {
                    results = _context.UsersProjects.Include(u => u.User).Include(s  => s.Supcust).Include(p => p.Product)
                        .Include(c => c.ProjectType).Where(woak => 
                        woak.ProjectType.RoleState == Role.Service || woak.ProjectType.RoleState == Role.ServiceAdmin).AsQueryable();
                }
                break;
                case Role.Sales :
                {
                    results = _context.UsersProjects.Include(u => u.User).Include(s  => s.Supcust).Include(p => p.Product)
                        .Include(c => c.ProjectType).Where(woak => 
                        woak.UserId == new Guid(nameid)).AsQueryable();
                }
                break;case Role.Service :
                {
                    results = _context.UsersProjects.Include(u => u.User).Include(s  => s.Supcust).Include(p => p.Product)
                        .Include(c => c.ProjectType).Where(woak => 
                        woak.UserId == new Guid(nameid)).AsQueryable();
                }
                break;
            }
            return await PagedList<UsersProject>.CreateAsync(results, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<IEnumerable<double>> GetProjectsProfit()
        {
            List<double> lstProfit = new List<double>();
            double[] dbl = new double[4];
            dbl[0] = await _context.UsersProjects.SumAsync(woak => woak.FactorAmount);
            dbl[1] = await _context.UsersProjects.Where(date => date.FactorDate >= 
            DateTime.Now.AddDays(-30)).SumAsync(woak => woak.FactorAmount);
            dbl[2] = await _context.UsersProjects.Where(date => date.FactorDate >= 
            DateTime.Now.AddDays(-7)).SumAsync(woak => woak.FactorAmount);
            dbl[3] = await _context.UsersProjects.Where(date => date.FactorDate >= 
            DateTime.Now.AddDays(-1)).SumAsync(woak => woak.FactorAmount);
            lstProfit.AddRange(dbl);
            return lstProfit;
        }
    }
}