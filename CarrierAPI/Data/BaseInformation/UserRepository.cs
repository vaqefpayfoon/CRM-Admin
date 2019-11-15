using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data.BaseInformation
{
    public class UserRepository : IUserRepository
    {
        private DataContext _context;

        public UserRepository (DataContext context) 
        {
            _context = context;
        }
        public void Add<T> (T entity) where T : class {
            _context.Add(entity);
        }

        public void Delete<T> (T entity) where T : class 
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(Guid id)
        {
            return await _context.Users.Include(c => c.City).FirstOrDefaultAsync(woak => woak.Id == id);
        }
        public async Task<User> GetUser(string username)
        {
            return await _context.Users.Include(c => c.City).FirstOrDefaultAsync(woak => woak.Username == username);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public Guid CityGuid(string cityName)
        {
            return  _context.Cities.FirstOrDefault(woak => woak.CityName == cityName).Id;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<IEnumerable<User>> GetUsers(string key, string role)
        {
            Role convertedRole = (Role)Enum.Parse(typeof(Role), role);
            IEnumerable<User> users = null;
            switch(convertedRole)
            {
                case Role.FullAccess :
                {
                    users = await _context.Users.Where(woak => woak.Username.ToLower()
                        .Contains(key.ToLower())).ToListAsync();
                }
                break;
                case Role.SalesAdmin :
                {
                    users = await _context.Users.Where(woak => woak.Username.ToLower()
                        .Contains(key.ToLower()) && 
                        (woak.UserRole == Role.SalesAdmin || woak.UserRole == Role.Sales)).ToListAsync();
                }
                break;
                case Role.ServiceAdmin :
                {
                    users = await _context.Users.Where(woak => woak.Username.ToLower()
                        .Contains(key.ToLower()) && 
                        (woak.UserRole == Role.ServiceAdmin || woak.UserRole == Role.Service)).ToListAsync();
                }
                break;
            } 
            return users;           
        }
    }
}