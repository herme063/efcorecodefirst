using System;

namespace hzero.efcorecodefirst.web.Models
{
	public class SearchResult
	{
		public Guid Uid { get; set; }
		public string Location { get; set; }
		public decimal Rating { get; set; }
		public int RatingCount { get; set; }
		public decimal Lat { get; set; }
		public decimal Lng { get; set; }
		public decimal Distance { get; set; }
	}
}