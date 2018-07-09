using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using hzero.efcorecodefirst.DataModel.Service;
using hzero.efcorecodefirst.Lib.Geo;
using hzero.efcorecodefirst.web.Models;
using Microsoft.AspNetCore.Mvc;

namespace hzero.efcorecodefirst.web.Controllers
{
	[Route("api/[controller]")]
	public class CourtFinderController : Controller
	{
		private readonly IGeoHelper _geoHelper;
		private readonly ICourtService _courtService;
		private readonly IMapper _mapper;

		public CourtFinderController(
			IGeoHelper geoHelper,
			ICourtService courtService,
			IMapper mapper)
		{
			_geoHelper = geoHelper;
			_courtService = courtService;
			_mapper = mapper;
		}

		[HttpPost]
		[Route("FindCourts")]
		public async Task<IActionResult> FindCourts(
			[FromForm]decimal swLat,
			[FromForm]decimal swLng,
			[FromForm]decimal neLat,
			[FromForm]decimal neLng)
			=> await Task.Run(() =>
				new JsonResult(_courtService
					.FindCourts(swLat, swLng, neLat, neLng)
					.Select(_mapper.Map<ICourtInfo, SearchResult>))
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
			});[HttpPost]

		[HttpGet]
		[Route("GetCourtDetail")]
		public async Task<IActionResult> GetCourtDetail(
			[FromQuery]Guid uid)
			=> await Task.Run(() =>
			{
				return new JsonResult(_mapper.Map<ICourtInfo, CourtDetail>(_courtService.GetCourtInfo(uid)));
			});

		[HttpGet]
		[Route("GetCourtReviews")]
		public async Task<IActionResult> GetCourtReviews(
			[FromQuery]Guid uid,
			[FromQuery]int page,
			[FromQuery]int size,
			[FromQuery]CourtReviewSortDirections sort)
			=> await Task.Run(() =>
			{
				return new JsonResult(_courtService
					.GetCourtReview(uid, page, size, sort)
					.Select(_mapper.Map<ICourtReview, CourtReview>));
			});

		[HttpGet]
		[Route("GetCourtThumb")]
		public async Task<IActionResult> GetCourtThumb(
			[FromQuery]Guid uid,
			[FromQuery]int idx)
			=> await Task.Run(() =>
			{
				return new FileContentResult(
					_courtService.GetCourtThumb(uid, idx),
					"image/jpeg");
			});

		[HttpGet]
		[Route("GetCourtSnapshot")]
		public async Task<IActionResult> GetCourtSnapshot(
			[FromQuery]Guid uid,
			[FromQuery]int idx)
			=> await Task.Run(() =>
			{
				return new FileContentResult(
					_courtService.GetCourtSnapshot(uid, idx),
					"image/jpeg");
			});

		[HttpPost]
		[Route("AddCourt")]
		public async Task<IActionResult> AddCourt(
			[FromBody] CourtEntity entity,
			[FromQuery] Guid puid) // todo: remove this once auth is implemented
			=> await Task.Run(() =>
			{
				return new JsonResult(_courtService.AddCourt(entity, puid));
			});

		[HttpPost]
		[Route("AddReview")]
		public async Task<IActionResult> AddReview(
			[FromBody] ReviewEntity entity,
			[FromQuery] Guid puid) // todo: remove this once auth is implemented
			=> await Task.Run(() =>
			{
				return new JsonResult(_courtService.AddReview(entity, puid));
			});
	}
}
