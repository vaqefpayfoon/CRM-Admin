using System;

namespace CarrierDomain.Models
{
    public class ModelsAttribute : Entity
    {
        public Guid RelatedObjectId { get; set; }
        public string AttributeName { get; set; }
        public string AttributeValue { get; set; }
    }
}