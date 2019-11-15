using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class Country : Entity
    {
        public string CountryName { get; set; }
        public ICollection<City> Cities { get; set; }
    }
}