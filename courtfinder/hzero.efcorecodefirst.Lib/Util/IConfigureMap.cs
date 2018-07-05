using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;

namespace hzero.efcorecodefirst.Lib
{
	public interface IConfigureMap
	{
		void Configure(IMapperConfigurationExpression cfg);
	}
}
