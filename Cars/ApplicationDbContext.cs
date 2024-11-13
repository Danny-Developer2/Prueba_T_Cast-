using Microsoft.EntityFrameworkCore;

namespace Carros.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Vehicle> Vehicles { get; set; }
         public DbSet<Image> Images { get; set; } 

          public DbSet<Image> Modelos { get; set; }  

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Vehicle>()
                .HasKey(v => v.Id);  

            modelBuilder.Entity<Vehicle>()
                .Property(v => v.Model)
                .IsRequired()  
                .HasMaxLength(100); 

              
            modelBuilder.Entity<Image>()
                .HasOne<Vehicle>() 
                .WithMany(v => v.Images)  
                .HasForeignKey(i => i.VehicleId); 
                
             modelBuilder.Entity<Modelos>()
                .HasOne<Vehicle>() 
                .WithMany(v => v.Modelos) 
                .HasForeignKey(m => m.VehicleId)
                .IsRequired(); 
        }

        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
               
                optionsBuilder.UseSqlite("Data Source=your_database.db")
                    .UseApplicationServiceProvider(new ServiceCollection().BuildServiceProvider());
            }
        }
    }
}
