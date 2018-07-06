using System;
using hzero.efcorecodefirst.DataModel;

namespace hzero.efcorecodefirst.web.Models
{
	public class CourtDetail
	{
		public Guid Uid { get; set; }
		public string Name { get; set; }
		public decimal Lat { get; set; }
		public decimal Lng { get; set; }
		public decimal Rating { get; set; }
		public decimal RatingCount { get; set; }
		public BasketballCourtFormats Format { get; set; }
		public BasketballCourtLocations Location { get; set; }
	}
}