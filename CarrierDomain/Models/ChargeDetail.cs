using System;

namespace CarrierDomain.Models
{
    public class ChargeDetail : Entity
    {
        public Guid ChargeId { get; set; }
        public Charge Charge { get; set; }
        public ChargeType Chargetype { get; set; }
        public double Amount { get; set; }
        public string MoreInfo { get; set; }
        
    }
}