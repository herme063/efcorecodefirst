using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;

namespace hzero.efcorecodefirst.Lib
{
    public interface IConfigureService
    {
		void Configure(IServiceCollection serviceCollection);
    }
}
