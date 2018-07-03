using hzero.efcorecodefirst.Lib;
using hzero.efcorecodefirst.Lib.Geo;
using Microsoft.Extensions.DependencyInjection;

namespace hzero.efcorecodefirst.DataModel
{
	public class LibConfigureService : IConfigureService
	{
		public void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddTransient<IGeoHelper, GeoHelper>();
		}
	}
}