using System;

namespace CarrierAPI.Dtos
{
    public class AttributeDto
    {
        public Guid RelatedObjectId { get; set; }
        public string AttributeName { get; set; }
        public string AttributeValue { get; set; }
    }
}