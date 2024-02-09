namespace App_Tienda.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Marca { get; set; }
        public string Categoria { get; set; }
        public int Precio { get; set; }
        public string Descripcion { get; set; }
        public string FotoUrl { get; set; }
        public string Modelo3d { get; set; }
    }
}
