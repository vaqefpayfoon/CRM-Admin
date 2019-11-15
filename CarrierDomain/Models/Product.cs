using System;
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class Product : Entity
    {
        public string ProductName { get; set; }
        public ICollection<SupcustGood> SupcustGoods { get; set; }
        public ICollection<UsersProject> UsersProjects { get; set; }

    }
}