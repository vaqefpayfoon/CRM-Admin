using System;
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class SupcustGood : Entity
    {
        public string MoreInfo { get; set; }
        public string PersonName { get; set; }   
        public string Serial { get; set; }
        public string Barcode { get; set; }
        public Guid SupcustId { get; set; }
        public Supcust Supcust { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public ICollection<UsersProject> UsersProjects { get; set; }
        
    }
}