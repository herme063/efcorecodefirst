using hzero.efcorecodefirst.DataModel.Service;
using hzero.efcorecodefirst.Lib;
using Microsoft.Extensions.DependencyInjection;

namespace hzero.efcorecodefirst.DataModel
{
	public class DataModelConfigureService : IConfigureService
	{
		public void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddTransient<ICourtService, CourtService>();
		}
	}
}