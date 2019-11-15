using System;

namespace CarrierDomain.Models
{
    public class StoreFile : Entity
    {
        public Guid RelatedObjectId { get; set; }
        public string FileName { get; set; }
        public string Url { get; set; }
        public string Extension { get; set; }
        public byte[] FileBytes { get; set; }
        public string TableName { get; set; }
    }
}