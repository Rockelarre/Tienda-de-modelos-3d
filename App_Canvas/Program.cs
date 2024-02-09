using System.Diagnostics;

namespace App_Canvas
{
	public class Program
	{
		public static void Main(string[] args)
		{
			// Iniciar el servidor Node.js en un hilo separado
			Thread nodeThread = new Thread(StartNodeServer);
			nodeThread.Start();

			// Iniciar el servidor web de ASP.NET Core
			CreateHostBuilder(args).Build().Run();
		}

		private static void StartNodeServer()
		{
			var nodePath = "node"; // Ruta al ejecutable de Node.js
			var nodeAppPath = "node_app/server.js"; // Ruta al archivo de la aplicación Node.js

			var processInfo = new ProcessStartInfo
			{
				FileName = nodePath,
				Arguments = nodeAppPath,
				UseShellExecute = true
			};

			Process.Start(processInfo);
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder.UseStartup<Startup>();
				});
	}
}

