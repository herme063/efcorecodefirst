using hzero.efcorecodefirst.Lib;
using Microsoft.EntityFrameworkCore;

namespace hzero.efcorecodefirst.DataModel
{
	internal class DataModelDbContext : BaseDbContext
	{
		public DbSet<Player> Players { get; set; }
		public DbSet<Rating> Ratings { get; set; }
		public DbSet<BasketballCourt> BasketballCourts { get; set; }
	}
}