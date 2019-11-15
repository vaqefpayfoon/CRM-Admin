using System;
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class ProjectType : Entity
    {
        public string ProjectTitle { get; set; }
        public Role RoleState { get; set; }
        public ICollection<UsersProject> UsersProjects { get; set; }
    }
}