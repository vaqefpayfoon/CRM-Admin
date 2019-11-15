using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}        
        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set;}
        public DbSet<City> Cities { get; set; }
        public DbSet<Supcust> Supcusts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<StoreFile> FileStores { get; set; }
        public DbSet<ModelsAttribute> ModelsAttributes { get; set; }
        public DbSet<ProjectType> ProjectTypes { get; set; }
        public DbSet<UsersProject> UsersProjects { get; set; }
        public DbSet<SupcustGood> SupcustGoods { get; set; }
        public DbSet<Charge> Charges { get; set; }
        public DbSet<ChargeDetail> ChargeDetails { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) 
        {  
            builder.Entity<Country>().HasMany(x => x.Cities).WithOne(y => y.Country).HasForeignKey(z => z.CountryId);

            builder.Entity<Supcust>().HasMany(x => x.SupcustGoods).WithOne(y => y.Supcust).HasForeignKey(z => z.SupcustId);
            builder.Entity<Product>().HasMany(x => x.SupcustGoods).WithOne(y => y.Product).HasForeignKey(z => z.ProductId);
            //builder.Entity<SupcustGood>().HasMany(x => x.UsersProjects).WithOne(y => y.SupcustGood).HasForeignKey(z => z.SupcustGoodId).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ProjectType>().HasMany(x => x.UsersProjects).WithOne(y => y.ProjectType).HasForeignKey(z => z.ProjectTypeId);
            builder.Entity<Supcust>().HasMany(x => x.UsersProjects).WithOne(y => y.Supcust).HasForeignKey(z => z.SupcustId).OnDelete(DeleteBehavior.Restrict);
            //builder.Entity<Product>().HasMany(x => x.UsersProjects).WithOne(y => y.Product).HasForeignKey(z => z.ProductId).OnDelete(DeleteBehavior.Restrict);            

            builder.Entity<Charge>().HasOne(x => x.User).WithMany(y => y.Charges)
            .HasForeignKey(z => z.UserId).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Charge>().HasMany(x => x.ChargeDetails).WithOne(y => y.Charge).HasForeignKey(z => z.ChargeId);

            // builder.Entity<UsersProject>()
            //     .HasKey(k => new {k.AdminUserId, k.UserId});

            builder.Entity<UsersProject>()
                .HasOne(u => u.AdminUser)
                .WithMany(u => u.AdminUsers)
                .HasForeignKey(u => u.AdminUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<UsersProject>()
                .HasOne(u => u.User)
                .WithMany(u => u.Users)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);            

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            
        }
    }
}