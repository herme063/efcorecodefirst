using System;
using hzero.efcorecodefirst.DataModel;
using hzero.efcorecodefirst.DataModel.Service;

namespace hzero.efcorecodefirst.web.Models
{
	public class CourtEntity : ICourtEntity
	{
		public Guid Uid { get; set; }
		public string Name { get; set; }
		public decimal Lat { get; set; }
		public decimal Lng { get; set; }
		public BasketballCourtFormats Format { get; set; }
		public BasketballCourtLocations Location { get; set; }
	}
}