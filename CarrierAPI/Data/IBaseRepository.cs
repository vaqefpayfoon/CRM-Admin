using System.Threading.Tasks;

namespace CarrierAPI.Data
{
    public interface IBaseRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<bool> Exists(string name);
    }
}