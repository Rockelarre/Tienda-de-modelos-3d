using Microsoft.AspNetCore.Identity;

namespace App_Tienda.Entities
{
    public class Usuario : IdentityUser
    {
        public string Nombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
    }
}
