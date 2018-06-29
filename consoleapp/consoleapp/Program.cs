using hzero.efcodefirst.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace consoleapp
{
    class Program
    {
        static void Main(string[] args)
        {
            AppSettings appSettings = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build()
                .GetSection("efcorecodefirstSettings")
                .Get<AppSettings>();
            var serviceCollection = new ServiceCollection();
            AddDbContext<DataModelDbContext>(serviceCollection, appSettings);
        }

        static void AddDbContext<TDbContext>(
            ServiceCollection services, 
            AppSettings appSettings)
            where TDbContext : DbContext
        {
            services.AddDbContext<TDbContext>(options =>
            {
                if (appSettings.LocalDatabaseConnectionString.Provider == AppSettingsConnectionStringProviders.PostGreSQL)
                {
                    options.UseNpgsql(appSettings.LocalDatabaseConnectionString.ConnectionString);
                }
                else
                {
                    throw new NotImplementedException("unsupported local database provider");
                }
            });
        }
    }
}
