using System;
using hzero.efcorecodefirst.DataModel;

namespace hzero.efcorecodefirst.web.Models
{
	public class CourtDetail
	{
		public Guid CourtUid { get; set; }
		public BasketballCourtFormats Format { get; set; }
		public BasketballCourtLocations Location { get; set; }
	}
}