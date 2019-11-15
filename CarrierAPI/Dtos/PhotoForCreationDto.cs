using System;
using Microsoft.AspNetCore.Http;

namespace CarrierAPI.Dtos
{
    public class PhotoForCreationDto
    {
        public Guid UserId { get; set; }
        public string Url { get; set; }
        public string FileName { get; set; }
        public string TableName { get; set; }
        public string Extension { get; set; }
        public IFormFile File { get; set; }
    }
}