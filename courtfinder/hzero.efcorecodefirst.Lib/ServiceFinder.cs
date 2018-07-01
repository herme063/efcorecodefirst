using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace hzero.efcorecodefirst.Lib
{
	public static class ServiceFinder
	{
		private static IServiceProvider _provider;

		public static void Configure(IServiceCollection services)
		{
			var serviceCollection = new ServiceCollection();
			serviceCollection.AddTransient<IAppSettings>(sp => {
				IConfiguration configuration = new ConfigurationBuilder()
					.AddJsonFile("appsettings.json", true, true)
					.Build();
				var appSettings = configuration
					.GetSection("efcorecodefirstSettings")
					.Get<AppSettings>();
				appSettings.ConnectionStrings = configuration
					.GetSection("ConnectionStrings")
					.Get<AppSettingsConnectionString[]>();

				return appSettings;
			});

			// find all class that implements IConfigureService
			foreach (IConfigureService cfg in GetServiceConfigurators())
			{
				cfg.Configure(serviceCollection);
			}

			_provider = serviceCollection.BuildServiceProvider();
		}

		public static TService Find<TService>()
			=> _provider != null ? _provider.GetService<TService>() : throw new InvalidOperationException("need to call Configure()");

		private static IEnumerable<IConfigureService> GetServiceConfigurators()
		{
			Assembly entryAssembly = Assembly.GetEntryAssembly();
			foreach (AssemblyName assemblyName in new[] { entryAssembly.GetName() }
				.Concat(entryAssembly.GetReferencedAssemblies()))
			{
				Assembly assembly = Assembly.Load(assemblyName);
				foreach (var ti in assembly.DefinedTypes)
				{
					if (ti.IsClass && typeof(IConfigureService).IsAssignableFrom(ti))
					{
						yield return (IConfigureService)assembly.CreateInstance(ti.FullName);
					}
				}
			}
		}
	}
}