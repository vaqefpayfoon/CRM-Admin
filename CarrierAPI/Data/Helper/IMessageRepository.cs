using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierAPI.Helpers;
using CarrierDomain.Models;

namespace CarrierAPI.Data.Helper
{
    public interface IMessageRepository : IBaseRepository
    {
        Task<Message> GetMessage(System.Guid id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}