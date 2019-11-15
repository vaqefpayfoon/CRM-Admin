using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.Helper
{
    public class ProjectTypeRepository : IProjectTypeRepository
    {
        private DataContext _context;
        public ProjectTypeRepository(DataContext context)
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

        public async Task<bool> Exists(string name)
        {
            if (await _context.ProjectTypes.AnyAsync(x => x.ProjectTitle == name))
                return true;

            return false;
        }

        public async Task<ProjectType> GetProjectType(Guid id)
        {
            return await _context.ProjectTypes.FindAsync(id);
        }
        public async Task<ProjectType> GetProjectType(string name)
        {
            return await _context.ProjectTypes.FirstOrDefaultAsync(woak => woak.ProjectTitle == name);
        }
        public async Task<IEnumerable<ProjectType>> GetProjectTypes(string name, string role)
        {             
            Role convertedRole = (Role)Enum.Parse(typeof(Role), role);
            IEnumerable<ProjectType> projects = null;
            switch(convertedRole)
            {
                case Role.FullAccess :
                {
                    projects = await _context.ProjectTypes.Where(woak => woak.ProjectTitle.ToLower()
                            .Contains(name.ToLower())).ToListAsync();
                }
                break;
                case Role.SalesAdmin :
                {
                    projects = await _context.ProjectTypes.Where(woak => woak.ProjectTitle.ToLower()
                        .Contains(name.ToLower()) && 
                        (woak.RoleState == Role.SalesAdmin || woak.RoleState == Role.Sales)).ToListAsync();
                }
                break;
                case Role.ServiceAdmin :
                {
                    projects = await _context.ProjectTypes.Where(woak => woak.ProjectTitle.ToLower()
                        .Contains(name.ToLower()) && 
                        (woak.RoleState == Role.ServiceAdmin || woak.RoleState == Role.Service)).ToListAsync();
                }
                break;
            } 
            return projects;   
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}