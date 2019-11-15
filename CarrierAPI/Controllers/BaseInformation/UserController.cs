using System.Threading.Tasks;
using CarrierAPI.Data.BaseInformation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;
using CarrierDomain.Models;
using CarrierAPI.Dtos;
using AutoMapper;
using System;
using CarrierAPI.Data;
using System.Security.Claims;

namespace CarrierAPI.Controllers.BaseInformation
{
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IAuthRepository _repoAth;
        private readonly IMapper _mapper;
         
        public UserController (IUserRepository repo, IMapper mapper, IAuthRepository repoAth) 
        {
            _repo = repo;
            _mapper = mapper;
            _repoAth = repoAth;
        }
        [HttpGet("default")]
        public IActionResult Default()
        {
            return Ok("we got the message");
        }
        [HttpPost("saveUser")]
        public async Task<IActionResult> SaveUser(UserForRegisterDto model)
        {
            model.Username = model.Username.ToLower();
            model.CityId = _repo.CityGuid(model.CityName);
            if (await _repoAth.UserExists(model.Username))
                return BadRequest("Username already exists");

            User userToCreate = _mapper.Map<User>(model);

            var createdUser = await _repoAth.Register(userToCreate, model.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

            return Ok(new {id = createdUser.Id});
        }
        [HttpPost("updateUser")]
        public async Task<IActionResult> UpdateUser(UserForUpdateDto userForUpdateDto)
        {
            userForUpdateDto.CityId = _repo.CityGuid(userForUpdateDto.CityName);
            var user = await _repo.GetUser(userForUpdateDto.Id);
            _mapper.Map(userForUpdateDto, user);
            if (await _repo.SaveAll())
                return Ok(user);

            throw new Exception($"Updating user {userForUpdateDto.Id} failed on save");
            
        }
        [HttpPost("deleteUser")]
        public async Task<IActionResult> DeleteUser(StringModel name) 
        {        
            User user = await _repo.GetUser(name.Name);

            _repo.Delete(user);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this user");
        }
        [HttpGet("getUser")]
        public async Task<IActionResult> GetUser(string key, string field) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault();
            User user;
            if(field.Equals("name"))
                user = await _repo.GetUser(key);
            else
                user = await _repo.GetUser(new System.Guid(key));
            UserForDetailedDto userDto = _mapper.Map<UserForDetailedDto>(user);
            return Ok(new {userDto = userDto});
        }
        [HttpGet("filteredUsers")]
        public async Task<IActionResult> FilteredUsers(string key) 
        {        
            // var role = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            // var identity = (ClaimsPrincipal)System.Threading.Thread.CurrentPrincipal;
            // var name = identity.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            // var sid = identity.Claims.Where(c => c.Type == ClaimTypes.Sid).Select(c => c.Value).SingleOrDefault();
            // var role = identity.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).SingleOrDefault();
            // var er = User.Identities;
             
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault(); 
            var users = await _repo.GetUsers(key, roles);
            //IEnumerable<City> CityName = cities.Select(a => new City{Id = a.Id, CityName = a.CityName});
            IEnumerable<string> userName = users.Select(a => a.Username);
            string output = JsonConvert.SerializeObject(userName);
            return Ok (output);
        }
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(UserForLoginDto userForLoginDto)
        {
            var user = await _repo.GetUser(userForLoginDto.Username);
            
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(userForLoginDto.Password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            if (await _repo.SaveAll())
            {
                string message = "password changed successfully";
                return Ok(message);
            }

            throw new Exception($"Updating user {userForLoginDto.Username} failed on save");
            
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}