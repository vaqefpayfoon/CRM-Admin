using System;

namespace CarrierDomain.Models
{
    public abstract class Entity
    {
        private Guid _guid;

        public Guid Id
        {
            get
            {
                if (_guid == Guid.Empty)
                    _guid = Guid.NewGuid();
                return _guid;
            }
            set => _guid = value;
        }
        public DateTime CreatedAt { get; set; }
        public Entity()
        {
            CreatedAt = DateTime.Now;
        }
    }
}