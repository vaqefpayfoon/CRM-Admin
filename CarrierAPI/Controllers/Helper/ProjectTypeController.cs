using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CarrierAPI.Data.Helper;
using CarrierAPI.Dtos;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CarrierAPI.Controllers.Helper
{
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ProjectTypeController : ControllerBase
    {        
        private readonly IProjectTypeRepository _repo;
        private readonly IMapper _mapper;
        public ProjectTypeController (IProjectTypeRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("default")]
        public IActionResult Default(StringModel str)
        {
            return Ok("we got the message" + str.Name);
        }
        [HttpPost("saveProjectType")]
        public async Task<IActionResult> SaveProjectType(ProjectType model)
        {
            if (await _repo.Exists(model.ProjectTitle.ToLower()))
                return BadRequest("ProjectType already exists");

            _repo.Add(model);
            if (await _repo.SaveAll())
                return Ok(new {id = model.Id});

            throw new Exception($"Save ProjectType {model.ProjectTitle} failed on save");
        }
        [HttpPost("updateProjectType")]
        public async Task<IActionResult> UpdateProjectType(ProjectType model)
        {
            var projectType = await _repo.GetProjectType(model.Id);
            projectType.ProjectTitle = model.ProjectTitle;
            if (await _repo.SaveAll())
                return Ok(projectType);

            throw new Exception($"Updating ProjectType {model.Id} failed on save");
            
        }
        [HttpPost("deleteProjectType")]
        public async Task<IActionResult> DeleteProjectType(ProjectType name) 
        {        
            ProjectType projectType = await _repo.GetProjectType(name.ProjectTitle);

            _repo.Delete(projectType);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this ProjectType");
        }
        [HttpGet("getProjectType")]
        public async Task<IActionResult> GetProjectType(string key, string field) 
        {        
            ProjectType projectType;
            if(field.Equals("name"))
                projectType = await _repo.GetProjectType(key);
            else
                projectType = await _repo.GetProjectType(new System.Guid(key));
            return Ok(projectType);
        }

        [HttpGet("filteredProjectType")]
        public async Task<IActionResult> FilteredProjectType(string key) 
        {
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault();         
            var projectTypes = await _repo.GetProjectTypes(key, roles);
            IEnumerable<string> productName = projectTypes.Select(a => a.ProjectTitle);
            string output = JsonConvert.SerializeObject(productName);
            return Ok (output);
        }
    }
}