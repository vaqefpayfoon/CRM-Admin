using System;

namespace CarrierAPI.Dtos
{
    public class CityDto
    {
        public Guid Id { get; set; }
        public Guid CountryId { get; set; }
        public string CityName { get; set; }
        public string CountryName { get; set; }
    }
}