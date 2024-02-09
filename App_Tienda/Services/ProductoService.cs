using System;
using System.Collections.Generic;
using System.Text.Json;

namespace App_Tienda.Services
{
	public interface IProductoService
	{
		Dictionary<string, JsonElement> ProductosAgregados { get; }
		void AgregarProducto(JsonElement producto);
	}

	public class ProductoService : IProductoService
	{
		private readonly Dictionary<string, JsonElement> _productosAgregados = new Dictionary<string, JsonElement>();

		public Dictionary<string, JsonElement> ProductosAgregados => _productosAgregados;

		public void AgregarProducto(JsonElement producto)
		{
			var idProducto = Guid.NewGuid().ToString();
			_productosAgregados[idProducto] = producto;
		}
	}
}
