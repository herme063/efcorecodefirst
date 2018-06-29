using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.Linq;

namespace consoleapp
{
    public class AppSettings
    {
        public AppSettingsConnectionString LocalDatabaseConnectionString 
            => ConnectionStrings.SingleOrDefault(cs => cs.Name == "LocalDatabase");

        public List<AppSettingsConnectionString> ConnectionStrings { get; set; }
    }

    public class AppSettingsConnectionString
    {
        public string Name { get; set; }
        public string ConnectionString { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public AppSettingsConnectionStringProviders Provider { get; set; }
    }

    public enum AppSettingsConnectionStringProviders
    {
        PostGreSQL = 1
    }
}
