using hzero.efcorecodefirst.Lib;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace hzero.efcorecodefirst.web
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

			// add a hook for service finder...this should be the last call
			ServiceFinder.Configure(services);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseStaticFiles();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseHttpsRedirection();
				app.UseHsts();
			}
			app.UseAuthentication();
			app.UseMvc(routes =>
			{
				routes.MapRoute("webapi", "api/{controller}/{action=Get}");
				routes.MapRoute("default", "{controller}/{action}/{id?}");
			});
		}
	}
}
