using System;
using System.ComponentModel.DataAnnotations;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Http;

namespace CarrierAPI.Dtos
{
    public class UserForRegisterDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string FullName { get; set; }
        public string NationalCode { get; set; }        
        public DateTime DateOfBirth { get; set; }
        public string MoreInfo { get; set; }           
        public Guid CityId { get; set; }
        public string CityName { get; set; }     
        public string UserRole { get; set; }   
        public string Email { get; set; }
        public string Phone { get; set; }
        public string File { get; set; }
        public IFormFile StoreFile { get; set; }

    }
}