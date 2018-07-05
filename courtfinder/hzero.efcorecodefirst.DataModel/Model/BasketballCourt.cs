using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace hzero.efcorecodefirst.DataModel
{
	internal class BasketballCourt
	{
		[Key]
		public Guid Uid { get; set; }
		public string Address { get; set; }
		public decimal Latitude { get; set; }
		public decimal Longitude { get; set; }
		public BasketballCourtFormats Format { get; set; }
		public BasketballCourtLocations Location { get; set; }
		public List<Rating> Ratings { get; set; }
			= new List<Rating>();
	}
}
