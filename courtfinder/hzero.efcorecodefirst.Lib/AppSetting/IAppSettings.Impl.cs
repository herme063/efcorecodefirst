using System.Linq;

namespace hzero.efcorecodefirst.Lib
{
	internal class AppSettings :
		IAppSettings
	{
		public string MySetting { get; set; }
		public AppSettingsConnectionString[] ConnectionStrings { get; set; }

		IAppSettingsConnectionString IAppSettings.GetConnectionString()
			=> ConnectionStrings.Single(cs => cs.Name == "(default)");
	}
}
