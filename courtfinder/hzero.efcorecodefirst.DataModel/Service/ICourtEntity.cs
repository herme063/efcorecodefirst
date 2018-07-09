using System;

namespace hzero.efcorecodefirst.DataModel.Service
{
	public interface ICourtEntity
	{
		Guid Uid { get; }
		string Name { get; }
		decimal Lat { get; }
		decimal Lng { get; }
		BasketballCourtFormats Format { get; }
		BasketballCourtLocations Location { get; }
	}
}