using System;
using hzero.efcorecodefirst.Lib;

namespace consoleapp
{
	class Program
	{
		static void Main(string[] args)
		{
			var s = ServiceFinder.Find<IAppSettings>();

			Console.Write("So far so good...[ENTER] to close");
			Console.ReadLine();
		}
	}
}