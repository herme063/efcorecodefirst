using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using hzero.efcorecodefirst.Lib.Geo;
using hzero.efcorecodefirst.web.Models;
using Microsoft.AspNetCore.Mvc;

namespace hzero.efcorecodefirst.web.Controllers
{
	[Route("api/[controller]")]
	public class CourtFinderController : Controller
	{
		private readonly IGeoHelper _geoHelper;
		private readonly Random _randy;

		public CourtFinderController(
			IGeoHelper geoHelper)
		{
			_geoHelper = geoHelper;
			_randy = new Random(Environment.TickCount);
		}

		[HttpPost]
		[Route("FindCourts")]
		public async Task<IActionResult> FindCourts(
			[FromForm]decimal swLat,
			[FromForm]decimal swLng,
			[FromForm]decimal neLat,
			[FromForm]decimal neLng)
			=> await Task.Run(() =>
				new JsonResult(new[]
				{
					new SearchResult { Uid = Guid.NewGuid(), Location = "Test 1", Rating = 3.4m, RatingCount = 10, Lat = GetRandomDecimal(swLat, neLat), Lng = GetRandomDecimal(swLng, neLng) },
					new SearchResult { Uid = Guid.NewGuid(), Location = "Test 2", Rating = 4.4m, RatingCount = 47, Lat = GetRandomDecimal(swLat, neLat), Lng = GetRandomDecimal(swLng, neLng) },
					new SearchResult { Uid = Guid.NewGuid(), Location = "Test 3", Rating = 2.5m, RatingCount = 30, Lat = GetRandomDecimal(swLat, neLat), Lng = GetRandomDecimal(swLng, neLng) },
					new SearchResult { Uid = Guid.NewGuid(), Location = "Test 4", Rating = 3.1m, RatingCount = 12, Lat = GetRandomDecimal(swLat, neLat), Lng = GetRandomDecimal(swLng, neLng) },
					new SearchResult { Uid = Guid.NewGuid(), Location = "Test 5", Rating = 5.0m, RatingCount = 1 , Lat = GetRandomDecimal(swLat, neLat), Lng = GetRandomDecimal(swLng, neLng) }
				})
			);

		[HttpPost]
		[Route("FindLocation")]
		public async Task<IActionResult> FindLocation(
			[FromForm]string location)
			=> await Task.Run(() =>
			{
				IDictionary<string, (decimal lat, decimal lng)> result = _geoHelper.Geocode(location);
				if (!result.ContainsKey(location))
				{
					throw new Exception($"unable to locate {location}");
				}

				return new JsonResult(new
				{
					Lat = result[location].lat,
					Lng = result[location].lng
				});
			});

		private decimal GetRandomDecimal(decimal dec1, decimal dec2)
		{
			decimal min = dec1 < dec2 ? dec1 : dec2;
			decimal max = dec1 < dec2 ? dec2 : dec1;
			decimal delta = max - min;

			return min + delta * (decimal)_randy.NextDouble();
		}
	}
}
