using System;
using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class ProjectHeaderDto
    {
        public Guid Id { get; set; }
        public Guid ProjectTypeId { get; set; }
        public SaleState SaleState { get; set; }
        public Guid SupcustGoodId { get; set; }
        public string ProjectTitle { get; set; }
        public Guid SupcustId { get; set; }
        public string SupcustName { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public Guid AdminUserId { get; set; }
        public string AdminUser { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string AdminOrder { get; set; }
        public DateTime ToDoDate { get; set; }
        public bool ProjectActive { get; set; }
    }
}