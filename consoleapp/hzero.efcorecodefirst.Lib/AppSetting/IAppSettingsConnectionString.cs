namespace hzero.efcorecodefirst.Lib
{
	public interface IAppSettingsConnectionString
	{
		string Name { get; }
		string ConnectionString { get; }
		AppSettingsConnectionStringProviders Provider { get; }
	}
}