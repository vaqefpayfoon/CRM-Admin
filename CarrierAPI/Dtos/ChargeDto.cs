using System;
using System.Collections.Generic;
using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class ChargeDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public Guid CityId { get; set; }
        public string CityName { get; set; }
        public bool Confirm { get; set; }
        public DateTime CreateAt { get; set; }
        public ICollection<ChargeDetail> ChargeDetails;
    }
}