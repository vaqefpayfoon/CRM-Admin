using System;
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class Supcust : Entity
    {
        public string SupcustName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string MoreInfo { get; set; }
        public Guid CityId { get; set; }
        public City City { get; set; }
        public ICollection<SupcustGood> SupcustGoods { get; set; }
        public ICollection<UsersProject> UsersProjects { get; set; }
    }
}