﻿using System.Linq;

namespace hzero.efcorecodefirst.Lib
{
	internal class AppSettings :
		IAppSettings
	{
		public AppSettingsConnectionString[] ConnectionStrings { get; set; }

		IAppSettingsConnectionString IAppSettings.GetConnectionString()
			=> ConnectionStrings.Single(cs => cs.Name == "(default)");
	}
}
