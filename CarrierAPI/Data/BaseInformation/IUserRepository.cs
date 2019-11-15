using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data.BaseInformation
{
    public interface IUserRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<User> GetUser(System.Guid id);
         Task<User> GetUser(string username);
         Task<IEnumerable<User>> GetUsers();
         Task<IEnumerable<User>> GetUsers(string key, string role);
         Guid CityGuid(string cityName);
    }
}