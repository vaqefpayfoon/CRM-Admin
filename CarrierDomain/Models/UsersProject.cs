using System;

namespace CarrierDomain.Models
{
    public class UsersProject : Entity
    {
        public Guid ProjectTypeId { get; set; }
        public ProjectType ProjectType { get; set; }
        public Guid SupcustId { get; set; }
        public Supcust Supcust { get; set; }
        public Guid? ProductId { get; set; }
        public virtual Product Product { get; set; }
        public Guid AdminUserId { get; set; }
        public User AdminUser { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid? SupcustGoodId { get; set; }
        public virtual SupcustGood SupcustGood { get; set; }
        public string AdminOrder { get; set; }
        public DateTime ToDoDate { get; set; }
        public bool ProjectActive { get; set; }        
        public DateTime FinishDate { get; set; }
        public string MoreInfo { get; set; }
        public bool FinishProject { get; set; }
        public DateTime DateRefer { get; set; }
        public string FactorNo { get; set; }
        public DateTime FactorDate { get; set; }
        public double FactorAmount { get; set; }
        public double Discount { get; set; }
        public int Tax { get; set; }
        public SaleState SaleState { get; set; }
        public ProjectState ProjectState { get; set; }
    }
}