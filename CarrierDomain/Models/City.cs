using System;

namespace CarrierDomain.Models
{
    public class City : Entity
    {
        public Guid CountryId { get; set; }
        public Country Country { get; set; }
        public string CityName { get; set; }
    }
}