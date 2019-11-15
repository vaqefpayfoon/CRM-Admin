using System;

namespace CarrierAPI.Dtos
{
    public class SupcustRegisterDto
    {
        public Guid Id { get; set; }
        public string SupcustName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string MoreInfo { get; set; }
        public Guid CityId { get; set; }
        public string CityName { get; set; }
    }
}