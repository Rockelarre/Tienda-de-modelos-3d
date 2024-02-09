using API_Tienda.Models;
using Microsoft.EntityFrameworkCore;

namespace API_Tienda.Data
{
    public class APITiendaContext : DbContext

    {
        public APITiendaContext(DbContextOptions<APITiendaContext> options)
            : base(options) { }

        public DbSet<Producto> Productos { get; set; } = null!;
    }
}
