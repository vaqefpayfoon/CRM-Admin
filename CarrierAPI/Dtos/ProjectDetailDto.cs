using System;
using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class ProjectDetailDto
    {
        public Guid Id { get; set; }
        public string ProjectTitle { get; set; }
        public string SupcustName { get; set; }
        public string ProductName { get; set; }
        public string AdminUser { get; set; }
        public string UserName { get; set; }
        public DateTime FinishDate { get; set; }
        public string MoreInfo { get; set; }
        public bool FinishProject { get; set; }
        public DateTime DateRefer { get; set; }
        public SaleState SaleState { get; set; }
    }
}