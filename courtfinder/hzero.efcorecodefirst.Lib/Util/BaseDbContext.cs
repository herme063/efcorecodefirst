using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace hzero.efcorecodefirst.Lib
{
	public abstract class BaseDbContext : DbContext
	{
		private readonly IAppSettings _appSettings;

		public BaseDbContext()
			: this(ServiceFinder.Find<IAppSettings>())
		{}

		public BaseDbContext(
			IAppSettings appSettings)
		{
			_appSettings = appSettings;
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			if (!optionsBuilder.IsConfigured)
			{
				IAppSettingsConnectionString connectionString = _appSettings.GetConnectionString();
				if (connectionString.Provider == AppSettingsConnectionStringProviders.PostGreSQL)
				{
					optionsBuilder.UseNpgsql(connectionString.ConnectionString);
				}
				else
				{
					throw new NotImplementedException($"no logic written for the connection string provider {connectionString.Provider}");
				}
			}
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// Configure Model
			// make sure the model has an empty constructor otherwis this will fail
			foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
			{
				if (typeof(IConfigureModel).IsAssignableFrom(entityType.ClrType))
				{
					((IConfigureModel)Activator.CreateInstance(entityType.ClrType)).Configure(modelBuilder);
				}
			}
		}
	}
}
