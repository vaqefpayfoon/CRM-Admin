using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using CarrierAPI.Data.Helper;
using CarrierAPI.Dtos;
using CarrierDomain.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarrierAPI.Controllers.Helper
{
    [Route ("api/[controller]")]
    [ApiController]
    public class StoreFileController : ControllerBase
    {
        private readonly IStoreFileRepository _repo;
        private readonly IMapper _mapper;
        public StoreFileController (IStoreFileRepository repo, IMapper mapper) 
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("savePhoto")]
        public async Task<IActionResult> savePhoto([FromForm]PhotoForCreationDto photoForCreationDto)
        {
            
            var file = photoForCreationDto.File;
            byte[] fileBytes;
            if (file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    StoreFile storeFile = new StoreFile();; 
                    file.CopyTo(ms);
                    fileBytes = ms.ToArray();
                    storeFile.FileBytes = fileBytes;
                    storeFile.Extension = photoForCreationDto.Extension;
                    storeFile.Url = photoForCreationDto.Url;
                    storeFile.TableName = photoForCreationDto.TableName;
                    storeFile.FileName = file.FileName;
                    storeFile.RelatedObjectId = photoForCreationDto.UserId;
                    _repo.Add(storeFile);
                }
            }       
             
            if (await _repo.SaveAll())
                return Ok();

            throw new Exception($"Updating user failed on save");
            
        }
        [HttpGet("getFile")]
        public async Task<IActionResult> GetFile(string model)
        {
            StoreFile storeFile = await _repo.GetFile(new System.Guid(model));
            return Ok(new {model = storeFile});
        }
    }
}