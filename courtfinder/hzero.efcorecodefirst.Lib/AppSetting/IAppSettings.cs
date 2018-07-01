namespace hzero.efcorecodefirst.Lib
{
	public interface IAppSettings
	{
		string MySetting { get; }

		IAppSettingsConnectionString GetConnectionString();
	}
}