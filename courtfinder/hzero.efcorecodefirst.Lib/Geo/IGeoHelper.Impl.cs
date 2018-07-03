using System.Collections.Generic;
using System.Linq;
using System.Net;
using Newtonsoft.Json;

namespace hzero.efcorecodefirst.Lib.Geo
{
	internal class GeoHelper : IGeoHelper
	{
		public IDictionary<string, (decimal lat, decimal lgn)> Geocode(params string[] locations)
		{
			return UCLAGeocode(locations);
		}

		private static IDictionary<string, (decimal lat, decimal lgn)> UCLAGeocode(
			params string[] locations)
		{
			IDictionary<string, string> inputs = new HashSet<string>(locations)
				.ToDictionary(l => l, l => WebUtility.UrlEncode(l));
			IDictionary<string, (decimal lat, decimal lgn)> outputs =
				new Dictionary<string, (decimal lat, decimal lgn)>();
			using (var cli = new WebClient())
			{
				foreach (string location in inputs.Keys)
				{
					string json = cli.DownloadString($"https://gis.ucla.edu/service_geocode?sensor=false&address={inputs[location]}");
					dynamic response = JsonConvert.DeserializeObject(json);
					if (response.status == "OK")
					{
						var l = response.results[0].geometry.location;
						outputs[location] = ((decimal)l.lat, (decimal)l.lng);
					}
				}
			}

			return outputs;
		}
	}
}
