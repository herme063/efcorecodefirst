using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace hzero.efcorecodefirst.Lib
{
	public static class ServiceFinder
	{
		private static IServiceProvider _provider;

		public static void Configure(IServiceCollection services)
		{
			// for debuggin migration
			//System.Diagnostics.Debugger.Launch();

			services.AddTransient<IAppSettings>(sp => {
				
				var appSettings = new AppSettings();
				IConfiguration configuration = new ConfigurationBuilder()
					.SetBasePath(Directory.GetCurrentDirectory())
					.AddJsonFile("appsettings.json", false, true)
					.Build();
				configuration.GetSection("efcorecodefirstSettings")
					.Bind(appSettings);

				return appSettings;
			});

			// find all class that implements IConfigureService
			foreach (IConfigureService cfg in GetThings<IConfigureService>())
			{
				cfg.Configure(services);
			}

			// find all class that implements IConfigureMap
			Mapper.Initialize(cfg =>
			{
				services.AddSingleton<IMapper>(sp => Mapper.Instance);

				foreach (IConfigureMap configurator in GetThings<IConfigureMap>())
				{
					configurator.Configure(cfg);
				}
			});

			_provider = services.BuildServiceProvider();
		}

		public static TService Find<TService>()
			=> _provider != null ? _provider.GetService<TService>() : throw new InvalidOperationException("need to call Configure()");

		internal static IEnumerable<TThingType> GetThings<TThingType>()
		{
			Assembly entryAssembly = Assembly.GetEntryAssembly();
			foreach (AssemblyName assemblyName in new[] { entryAssembly.GetName() }
				.Concat(entryAssembly.GetReferencedAssemblies()))
			{
				Assembly assembly = Assembly.Load(assemblyName);
				foreach (var ti in assembly.DefinedTypes)
				{
					if (ti.IsClass && typeof(TThingType).IsAssignableFrom(ti))
					{
						yield return (TThingType)assembly.CreateInstance(ti.FullName);
					}
				}
			}
		}
	}
}