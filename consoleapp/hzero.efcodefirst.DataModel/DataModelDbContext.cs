using Microsoft.EntityFrameworkCore;

namespace hzero.efcodefirst.DataModel
{
    public class DataModelDbContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<BasketballCourt> BasketballCourts { get; set; }

        public DataModelDbContext()
        { }

        public DataModelDbContext(DbContextOptions<DataModelDbContext> options)
            : base(options)
        { }
    }
}
