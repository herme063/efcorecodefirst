using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace hzero.efcorecodefirst.Lib
{
	public interface IConfigureModel
	{
		void Configure(ModelBuilder modelBuilder);
	}
}
