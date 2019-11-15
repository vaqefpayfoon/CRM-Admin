using System;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Http;

namespace CarrierAPI.Dtos
{
    public class UserForUpdateDto
    {
        public Guid Id { get; set; }   
        public string Username { get; set; }
        public string FullName { get; set; }           
        public string NationalCode { get; set; }        
        public DateTime DateOfBirth { get; set; }
        public string MoreInfo { get; set; }
        public Guid CityId { get; set; }                
        public string CityName { get; set; }                
        public string PhotoUrl { get; set; }     
        public Role UserRole { get; set; } 
        public string Email { get; set; }
        public string Phone { get; set; }
        public string File { get; set; }
    }
}