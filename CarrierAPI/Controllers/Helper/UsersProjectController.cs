using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CarrierAPI.Data.Helper;
using CarrierAPI.Dtos;
using CarrierAPI.Helpers;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CarrierAPI.Controllers.Helper
{
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UsersProjectController : ControllerBase
    {
        private readonly IUsersProjectRepository _repo;
        private readonly IMapper _mapper;
        public UsersProjectController (IUsersProjectRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("default")]
        public IActionResult Default(StringModel str)
        {
            return Ok("we got the message" + str.Name);
        }
        [HttpGet("getUsersProjectId")]
        public async Task<IActionResult> getUsersProjectId(string ProjectTypeId, string SupcustId, string ProductId, string userId)
        {        
            var ProductGuid = _repo.GetProductGuid(ProductId);
            var SupcustGuid = _repo.GetSupcustGuid(SupcustId);
            var ProjectTypeGuid = _repo.GetProjectTypeGuid(ProjectTypeId);
            var userGuid = _repo.GetUserGuid(userId);
            UsersProject userProject = await _repo.GetUsersProject(ProjectTypeGuid, 
            SupcustGuid, ProductGuid, userGuid);
            if(userProject == null)
                return BadRequest("can't find usersProject");
            return Ok(userProject.Id);
        }
        [HttpGet("getUsersProject")]
        public async Task<IActionResult> getUsersProject(string Id, string type) 
        {
            UsersProject userProject = await _repo.GetUsersProject(new System.Guid(Id));
            ProjectHeaderDto projectHeaderDto;
            ProjectDetailDto projectDetailDto;
            ProjectFinanceDto projectFinanceDto;
            if(userProject == null)
                return BadRequest("can't find usersProject");
            switch(type)
            {
                case "header":
                {
                    projectHeaderDto = _mapper.Map<ProjectHeaderDto>(userProject);
                    return Ok(projectHeaderDto);
                }
                case "detail":
                {
                    projectDetailDto = _mapper.Map<ProjectDetailDto>(userProject);
                    return Ok(projectDetailDto);
                }
                case "finance":
                {
                    projectFinanceDto = _mapper.Map<ProjectFinanceDto>(userProject);
                    return Ok(projectFinanceDto);
                }
            }
            return BadRequest("can't find usersProject");
        }
        [HttpPost("saveHeaderProject")]
        public async Task<IActionResult> SaveProjectType(ProjectHeaderDto model)
        {
            model.ProductId = _repo.GetProductGuid(model.ProductName);
            model.SupcustId = _repo.GetSupcustGuid(model.SupcustName);
            model.ProjectTypeId = _repo.GetProjectTypeGuid(model.ProjectTitle);
            model.UserId = _repo.GetUserGuid(model.UserName);
            UsersProject userProject = await _repo.GetUsersProject(model.ProjectTypeId, 
            model.SupcustId, model.ProductId, model.UserId);
            if(userProject != null)
                return BadRequest("this users project already defined");
            //UsersProject usersProject = _mapper.Map<UsersProject>(model);
            UsersProject usersProject = new UsersProject()
            {
                ProductId = model.ProductId,
                SupcustId = model.SupcustId,
                ProjectTypeId = model.ProjectTypeId,
                UserId = model.UserId,
                AdminUserId = model.AdminUserId,
                AdminOrder = model.AdminOrder,
                ToDoDate = model.ToDoDate,
                ProjectActive = model.ProjectActive,
                SaleState = model.SaleState
            };
            _repo.Add(usersProject);
            if (await _repo.SaveAll())
                return Ok(new {id = model.Id});

            throw new Exception($"Save UsersProject {model.Id} failed on save");
        }
        [HttpPost("updateHeaderProject")]
        public async Task<IActionResult> UpdateHeaderProject(ProjectHeaderDto model)
        {
            model.ProductId = _repo.GetProductGuid(model.ProductName);
            model.SupcustId = _repo.GetSupcustGuid(model.SupcustName);
            model.ProjectTypeId = _repo.GetProjectTypeGuid(model.ProjectTitle);
            model.UserId = _repo.GetUserGuid(model.UserName);
            UsersProject userProject = await _repo.GetUsersProject(model.Id);
            if(userProject == null)
                return BadRequest("can't find usersProject");
            _mapper.Map(model, userProject);
            if (await _repo.SaveAll())
                return Ok(new {id = model.Id});

            throw new Exception($"Save UsersProject {model.Id} failed on save");
        }
        [HttpPost("updateDetailProject")]
        public async Task<IActionResult> UpdateDetailProject(ProjectDetailDto model)
        {
            UsersProject userProject = await _repo.GetUsersProject(model.Id);
            if(userProject == null)
                return BadRequest("can't find usersProject");
            userProject.MoreInfo = model.MoreInfo;
            userProject.FinishDate = model.FinishDate;
            userProject.FinishProject = model.FinishProject;
            userProject.DateRefer = model.DateRefer;
            if (await _repo.SaveAll())
                return Ok(new {id = model.Id});

            throw new Exception($"Save UsersProject {model.Id} failed on save");
        }
        [HttpPost("updateFinanceProject")]
        public async Task<IActionResult> UpdateFinanceProject(ProjectFinanceDto model)
        {
            UsersProject userProject = await _repo.GetUsersProject(model.Id);
            if(userProject == null)
                return BadRequest("can't find usersProject");
                
            userProject.FactorNo = model.FactorNo;
            userProject.FactorDate = model.FactorDate;
            userProject.FactorAmount = model.FactorAmount;
            userProject.Discount = model.Discount;
            userProject.Tax = model.Tax;
            userProject.ProjectState = model.ProjectState;

            if (await _repo.SaveAll())
                return Ok(new {id = model.Id});

            throw new Exception($"Save UsersProject {model.Id} failed on save");
        }
        [HttpPost("deleteUsersProject")]
        public async Task<IActionResult> DeleteUsersProject(StringModel model) 
        {        
            UsersProject usersProject = await _repo.GetUsersProject(model.Id);

            _repo.Delete(usersProject);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this UsersProject");
        }
        [HttpGet("getUsersProjects")]
        public async Task<IActionResult> getUsersProjects([FromQuery]UserParams userParams) 
        {
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault();
            var nameid = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.NameIdentifier)
                .Select(c => c.Value).FirstOrDefault();
                
            PagedList<UsersProject> usersProjects = await _repo.GetUsersProjects(userParams, roles, nameid);
            IEnumerable<ProjectHeaderDto> projectHeaderDto;
            projectHeaderDto = _mapper.Map<IEnumerable<ProjectHeaderDto>>(usersProjects);
            Response.AddPagination(usersProjects.CurrentPage, usersProjects.PageSize,
                usersProjects.TotalCount, usersProjects.TotalPages);
            return Ok(projectHeaderDto);
        }
        [HttpGet("getProjectsProfit")]
        public async Task<IActionResult> getProjectsProfit() 
        {
            IEnumerable<double> dbl = await _repo.GetProjectsProfit();
            return Ok(dbl);
        }
    }
}