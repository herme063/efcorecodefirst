using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace hzero.efcorecodefirst.Lib
{
	internal class AppSettingsConnectionString :
		IAppSettingsConnectionString
	{
		public string Name { get; set; }
		public string ConnectionString { get; set; }

		[JsonConverter(typeof(StringEnumConverter))]
		public AppSettingsConnectionStringProviders Provider { get; set; }
	}
}
