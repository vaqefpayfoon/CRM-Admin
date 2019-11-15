using System;
using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class ProductRegisterDto
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
    }
}