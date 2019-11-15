using System;

namespace CarrierAPI.Dtos
{
    public class SupcustGoodDto
    {
        public Guid Id { get; set; }
        public string MoreInfo { get; set; }
        public string PersonName { get; set; }   
        public string Serial { get; set; }
        public string Barcode { get; set; }
        public Guid SupcustId { get; set; }
        public string SupcustName { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        
    }
}