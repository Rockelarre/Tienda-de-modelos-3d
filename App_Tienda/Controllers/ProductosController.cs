using App_Tienda.Models;
using App_Tienda.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace App_Tienda.Controllers
{
	[Route("[controller]")]
	public class ProductosController : Controller
	{
		private readonly HttpClient _httpClient;
		private readonly IWebHostEnvironment _environment;
		private readonly IProductoService _productoService;

		public ProductosController(HttpClient httpClient, IWebHostEnvironment environment, IProductoService productoService)
		{
			_httpClient = httpClient;
			_environment = environment;
			_productoService = productoService;
		}

		[HttpGet("catalogo")]
		public async Task<IActionResult> Catalogo()
		{
			var productos = await _httpClient.GetFromJsonAsync<List<Producto>>("https://localhost:7147/api/Productos");

			return View(productos);
		}

		[HttpPost("postearproducto")]
		public async Task<IActionResult> PostearProducto([FromBody] JsonElement jsonElement)
		{
			try
			{
				var producto = JsonSerializer.Deserialize<Producto>(jsonElement.GetRawText());

				var response = await _httpClient.PostAsJsonAsync("https://localhost:7147/api/Productos", producto);

				if (response.IsSuccessStatusCode)
				{
					return Ok("Producto guardado exitosamente.");
				}
				else
				{
					return StatusCode((int)response.StatusCode, "Error al guardar el producto.");
				}
			}
			catch (JsonException)
			{
				return BadRequest("El JSON proporcionado no es válido.");
			}
		}

		[HttpPost("subirarchivo")]
		public async Task<IActionResult> SubirArchivo(IFormFile archivo)
		{
			if (archivo != null && archivo.Length > 0)
			{
				var rutaDirectorio = Path.Combine(_environment.WebRootPath, "fotos");
				var rutaArchivo = Path.Combine(rutaDirectorio, archivo.FileName);

				using (var stream = new FileStream(rutaArchivo, FileMode.Create))
				{
					await archivo.CopyToAsync(stream);
				}

				return Content($"Archivo '{archivo.FileName}' subido correctamente.");
			}
			else
			{
				return Content("No se ha seleccionado un archivo.");
			}
		}


		[HttpPost("agregarcarrito")]
		public IActionResult AgregarCarrito([FromBody] JsonElement jsonElement)
		{
			try
			{
				_productoService.AgregarProducto(jsonElement);
				// Devolver el diccionario de productos agregados como parte de la respuesta

				foreach (var item in _productoService.ProductosAgregados)
				{
					Console.WriteLine(item);
				}
				return Ok(_productoService.ProductosAgregados);
			}
			catch (JsonException)
			{
				return BadRequest("El JSON proporcionado no es válido.");
			}
		}

		[HttpGet("carrito")]
		public IActionResult Carrito()
		{
			var productosAgregados = _productoService.ProductosAgregados;
			return View(productosAgregados);
		}

		[HttpGet("subirproducto")]
		public IActionResult SubirProducto()
		{
			return View();
		}

		[HttpGet("vercarrito")]
		public IActionResult VerCarrito()
		{
			return DecodificarTokenFromHeader();
		}

		[HttpGet("versubirproducto")]
		public IActionResult VerSubirProducto()
		{
			return DecodificarTokenFromHeader();
		}

		private IActionResult DecodificarTokenFromHeader()
		{
			try
			{
				// Obtener el token del encabezado de la solicitud
				string jwToken = HttpContext.Request.Headers["Authorization"];

				// Verificar si el token está presente en el encabezado de la solicitud
				if (string.IsNullOrEmpty(jwToken))
				{
					return BadRequest("El token no se proporcionó en el encabezado de la solicitud");
				}

				// Obtener la clave secreta del token
				string secretKey = jwToken.Substring(jwToken.Length - 44);

				// Configurar los parámetros de validación del token
				var tokenValidationParameters = new TokenValidationParameters
				{
					TokenDecryptionKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey)),
					ValidateIssuerSigningKey = true,
					ValidateIssuer = false,
					ValidateAudience = false,
					ClockSkew = TimeSpan.Zero
				};

				// Decodificar el token
				var jwtHandler = new JwtSecurityTokenHandler();
				var jsonToken = jwtHandler.ReadToken(jwToken) as JwtSecurityToken;

				// Devolver el token decodificado
				return Ok(jsonToken);
			}
			catch (Exception ex)
			{
				// Manejar cualquier excepción que ocurra durante el proceso de decodificación del token
				return BadRequest("Error al decodificar el token: " + ex.Message);
			}
		}
	}
}
