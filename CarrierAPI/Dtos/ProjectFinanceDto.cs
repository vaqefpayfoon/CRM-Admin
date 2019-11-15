using System;
using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class ProjectFinanceDto
    {
        public Guid Id { get; set; }
        public string ProjectTitle { get; set; }
        public string SupcustName { get; set; }
        public string ProductName { get; set; }
        public string AdminUser { get; set; }
        public string UserName { get; set; }
        public string FactorNo { get; set; }
        public DateTime FactorDate { get; set; }
        public double FactorAmount { get; set; }
        public double Discount { get; set; }
        public int Tax { get; set; }
        public ProjectState ProjectState { get; set; }
    }
}