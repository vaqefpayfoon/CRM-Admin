using System;
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class Charge : Entity
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid CityId { get; set; }
        public City City { get; set; }
        public bool Confirm { get; set; } = false;
        public ICollection<ChargeDetail> ChargeDetails { get; set; }
    }
}