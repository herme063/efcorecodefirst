using System;
using System.Collections.Generic;
using System.Text;

namespace hzero.efcorecodefirst.Lib.Geo
{
	internal class GeoHelper : IGeoHelper
	{
		public IDictionary<string, (decimal lat, decimal lgn)> Geocode(params string[] locations)
		{
			throw new NotImplementedException();
		}
	}
}
