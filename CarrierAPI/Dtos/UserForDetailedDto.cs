using System;
using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class UserForDetailedDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }           
        public string NationalCode { get; set; }
        public int Age { get; set; }       
        public string DateOfBirth { get; set; }
        public Guid CityId { get; set; }
        public string CityName { get; set; }        
        public string PhotoUrl { get; set; }     
        public Role UserRole { get; set; }
        public string MoreInfo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}