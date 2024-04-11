using Microsoft.EntityFrameworkCore;

namespace MinimalCatalogApi.Models
{
    public class CatalogDbContext: DbContext
    {
        public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the Item entity
            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.Id); // Specify the primary key
                entity.Property(e => e.Name).IsRequired(); // Ensure the Name property is required
                                                           // Add more configuration as needed
            });

            // Add additional entity configurations and relationships if necessary
        }
        public void SeedData()
        {
            var items = new List<Item>
            {
                new Item { Id = 1, Name = "Dell v1", Description = "Dell laptop", Category = "Laptop" },
                new Item { Id = 2, Name = "Hp v1", Description = "hp laptop", Category = "Laptop" },
                new Item { Id = 3, Name = "Lenovo v1", Description = "Lenovo laptop", Category = "Laptop" },
                new Item { Id = 4, Name = "ASUS v1", Description = "ASUS desktop", Category = "Desktop" },

            };
            Items.AddRange(items);
            SaveChanges();
        }
    }
}
