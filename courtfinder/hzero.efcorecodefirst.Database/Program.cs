using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace hzero.efcorecodefirst.Database
{
	internal class Program
    {
        static void Main(string[] args)
        {
			Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("*********************************");
			Console.WriteLine("* EF Core Code First - Database *");
			Console.WriteLine("*********************************");

			Console.ResetColor();

			IConfiguration configuration = new ConfigurationBuilder()
				.SetBasePath(Directory.GetCurrentDirectory())
				.AddJsonFile("appsettings.json")
				.Build();
			string connectionString = configuration.GetConnectionString("(default)");

			using (new ConsoleHelper("datamodeldbxontext code first"))
			{
				RunCodeFirstScripts($"{Directory.GetCurrentDirectory()}/migration_scripts/datamodeldbcontext/", connectionString);
			}

			using (new ConsoleHelper("seed"))
			{
				RunScripts($"{Directory.GetCurrentDirectory()}/seed_scripts/", connectionString);
			}

			Console.WriteLine("");
			Console.WriteLine("we are done here, press [enter] to close this");
			Console.ReadLine();
		}

		private static void RunCodeFirstScripts(
			string migrationScriptsPath, 
			string connectionString)
		{
			IList<(string file, string migration)> migrationScripts = Directory.EnumerateFiles(migrationScriptsPath, "*.sql")
				.Select(ms => (
					file: ms,
					migration: Path.GetFileNameWithoutExtension(ms)
				))
				.OrderBy(p => DateTime.ParseExact(p.migration.Split("_".ToCharArray())[0], "yyyyMMddHHmmss", CultureInfo.CurrentCulture))
				.ToList();
			using (var conn = new NpgsqlConnection(connectionString))
			{
				conn.Open();

				// check existing migration
				using (var cmd = new NpgsqlCommand())
				{
					cmd.Connection = conn;
					cmd.CommandText = @"
						CREATE TABLE IF NOT EXISTS ""__EFMigrationsHistory"" (
							""MigrationId""    VARCHAR(150) NOT NULL,
							""ProductVersion"" VARCHAR(32) NOT NULL,
							CONSTRAINT ""PK___EFMigrationsHistory"" PRIMARY KEY(""MigrationId"")
					);";
					cmd.ExecuteNonQuery();
				}

				var existingMigrationIndex = new HashSet<string>();
				using (var cmd = new NpgsqlCommand())
				{
					cmd.Connection = conn;
					cmd.CommandText = @"SELECT ""MigrationId"" FROM ""__EFMigrationsHistory""";
					using (NpgsqlDataReader reader = cmd.ExecuteReader())
					{
						while(reader.Read())
						{
							existingMigrationIndex.Add(reader.GetString(0));
						}
					}
				}

				// deploy missing migration
				foreach ((string file, string migration) migrationScript in migrationScripts
					.Where(ms => !existingMigrationIndex.Contains(ms.migration)))
				{
					Console.WriteLine($"applying {migrationScript.migration}...");

					using (var cmd = new NpgsqlCommand())
					{
						cmd.Connection = conn;
						cmd.CommandText = File.ReadAllText(migrationScript.file);
						cmd.ExecuteNonQuery();
					}
				}

				Console.WriteLine("");
			}
		}

		private static void RunScripts(
			string scriptsPath,
			string connectionString)
		{
			var queryBuilder = new StringBuilder();
			foreach (string scriptFilePath in Directory.EnumerateFiles(scriptsPath, "*.sql"))
			{
				queryBuilder.AppendLine(File.ReadAllText(scriptFilePath));
			}

			if (queryBuilder.Length > 0)
			{
				using (var conn = new NpgsqlConnection(connectionString))
				{
					conn.Open();
					using (var cmd = new NpgsqlCommand())
					{
						cmd.Connection = conn;
						cmd.CommandText = queryBuilder.ToString();
						cmd.ExecuteNonQuery();
					}
				}
			}
		}
	}

	internal class ConsoleHelper : IDisposable
	{
		private string _label;

		public ConsoleHelper(string label)
		{
			_label = label;
			Console.ForegroundColor = ConsoleColor.White;
			Console.WriteLine($"\n//// Running through {_label} scripts...");
			Console.ResetColor();
		}

		#region IDisposable Support
		private bool disposedValue = false; // To detect redundant calls

		protected virtual void Dispose(bool disposing)
		{
			if (!disposedValue)
			{
				if (disposing)
				{
					// TODO: dispose managed state (managed objects).
					Console.WriteLine($"\nDONE Running through {_label} scripts");
				}

				// TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
				// TODO: set large fields to null.

				disposedValue = true;
			}
		}

		// TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
		// ~ConsoleHelper() {
		//   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
		//   Dispose(false);
		// }

		// This code added to correctly implement the disposable pattern.
		public void Dispose()
		{
			// Do not change this code. Put cleanup code in Dispose(bool disposing) above.
			Dispose(true);
			// TODO: uncomment the following line if the finalizer is overridden above.
			// GC.SuppressFinalize(this);
		}
		#endregion
	}
}
