using System;
using System.Collections.Generic;
using System.Text;

namespace hzero.efcorecodefirst.Lib.Geo
{
    public interface IGeoHelper
    {
		IDictionary<string, (decimal lat, decimal lgn)> Geocode(params string[] locations);
    }
}
