using System;

namespace hzero.efcorecodefirst.DataModel.Service
{
	public interface ICourtInfo
	{
		Guid Uid { get; }
		string Name { get; }
		decimal Lat { get; }
		decimal Lng { get; }
		decimal AvgRating { get; }
		decimal RatingCount { get; }
		BasketballCourtFormats Format { get; }
		BasketballCourtLocations Location { get; }
	}
}