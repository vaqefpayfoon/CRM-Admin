using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierAPI.Dtos;
using CarrierAPI.Helpers;
using CarrierDomain.Models;

namespace CarrierAPI.Data
{
     public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
         Guid CityGuid(string cityName);
    }
}