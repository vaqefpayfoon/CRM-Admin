using System;
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class User : Entity
    {
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string FullName { get; set; }           
        public string NationalCode { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string MoreInfo { get; set; }
        public Guid CityId { get; set; }
        public City City { get; set; }        
        public Role UserRole { get; set; }
        public string Email { get; set; } 
        public string Phone { get; set; } 
        public string PhotoUrl { get; set; }
        public ICollection<UsersProject> AdminUsers { get; set; }
        public ICollection<UsersProject> Users { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<Charge> Charges { get; set; }
    }
}