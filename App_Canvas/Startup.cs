namespace App_Canvas
{
	public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Configuración de servicios
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("CERRAR ESTA PESTANHA. Abrir en otra pestanha la pagina https://localhost:7059/ que es el cliente principal de la aplicacion, gracias.");
                });
            });
        }
    }
}