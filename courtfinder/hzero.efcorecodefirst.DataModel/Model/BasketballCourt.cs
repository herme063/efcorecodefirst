using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using hzero.efcorecodefirst.Lib;
using Microsoft.EntityFrameworkCore;

namespace hzero.efcorecodefirst.DataModel
{
	internal class BasketballCourt : IConfigureModel
	{
		[Key]
		public Guid Uid { get; set; }
		public string Address { get; set; }
		public decimal Latitude { get; set; }
		public decimal Longitude { get; set; }
		public BasketballCourtFormats Format { get; set; }
		public BasketballCourtLocations Location { get; set; }
		public Guid AddedByUid { get; set; }
		public Player AddedBy { get; set; }
		public DateTime AddedOn { get; set; }
		public List<Rating> Ratings { get; set; }
			= new List<Rating>();

		void IConfigureModel.Configure(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<BasketballCourt>()
				.HasOne(c => c.AddedBy)
				.WithMany()
				.HasForeignKey(c => c.AddedByUid);
		}
	}
}
