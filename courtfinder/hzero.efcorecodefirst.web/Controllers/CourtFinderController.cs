using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using hzero.efcorecodefirst.web.Models;
using Microsoft.AspNetCore.Mvc;

namespace hzero.efcorecodefirst.web.Controllers
{
    [Route("api/[controller]")]
    public class CourtFinderController : Controller
    {
        [HttpPost]
		[Route("FindCourts")]
        public IActionResult FindCourts(
			[FromForm]string location)
        {
			return new JsonResult(new []
			{
				new SearchResult { Uid = Guid.NewGuid(), Location = "Test 1", Rating = 3.4m, RatingCount = 10 },
				new SearchResult { Uid = Guid.NewGuid(), Location = "Test 2", Rating = 4.4m, RatingCount = 47 },
				new SearchResult { Uid = Guid.NewGuid(), Location = "Test 3", Rating = 2.5m, RatingCount = 30 },
				new SearchResult { Uid = Guid.NewGuid(), Location = "Test 4", Rating = 3.1m, RatingCount = 12 },
				new SearchResult { Uid = Guid.NewGuid(), Location = "Test 5", Rating = 5.0m, RatingCount = 1 }
			});
        }
    }
}
