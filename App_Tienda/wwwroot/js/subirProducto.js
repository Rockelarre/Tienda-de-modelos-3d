
$(document).ready(function () {
    $('#fotoInput').change(function () {

        var nombreArchivo = $(this).val().split('\\').pop(); // Obtenemos solo el nombre del archivo
        $('#fotoNombreArchivo').val(nombreArchivo); // Establecemos el nombre del archivo en el elemento con id modelo3dContent

    });
});

$(document).ready(function () {
    $('#modelo3dInput').change(function () {
        var archivo = $(this)[0].files[0]; // Obtener el archivo seleccionado
        var lector = new FileReader();

        lector.onload = function (evento) {
            var contenido = evento.target.result;
            $('#modelo3dContent').val(contenido);
        };

        lector.readAsText(archivo);

    });
});

function GuardarProducto(event) {

    event.preventDefault();

    // Obtener los valores de los campos de entrada
    var nombre = $('#nombre').val();
    var marca = $('#marca').val();
    var categoria = $('#categoria').val();
    var precio = $('#precio').val();
    var descripcion = $('#descripcion').val();

    var nombreArchivoFoto = $('#fotoNombreArchivo').val();
    var modelo3d = $('#modelo3dContent').val();

    if (nombre != '' && marca != '' && categoria != '' && precio != '' &&
        descripcion != '' && nombreArchivoFoto != '' && modelo3d != '')
    {
        var datos = {
            nombre: nombre,
            marca: marca,
            categoria: categoria,
            precio: precio,
            descripcion: descripcion,
            fotourl: nombreArchivoFoto,
            modelo3d: modelo3d
        };

        // Realizar la solicitud POST con AJAX
        $.ajax({
            type: 'POST',
            url: 'https://localhost:7147/api/Productos',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {
                console.log('Producto guardado exitosamente:', response);
                // Manejar la respuesta del servidor según sea necesario
                
                var formData = new FormData(); // Crear un objeto FormData para enviar el archivo
                var archivo = $('#fotoInput')[0].files[0]; // Obtener el archivo seleccionado

                formData.append('archivo', archivo); // Agregar el archivo al FormData

                $.ajax({
                    url: '/Productos/SubirArchivo', // Ruta en el servidor para manejar la solicitud y guardar el archivo
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function () {
                        Swal.fire({
                            title: "Felicitaciones!",
                            text: "El producto se ha guardado exitosamente.",
                            icon: "success"

                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = 'https://localhost:7059/productos/catalogo';
                            }
                        });
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error('Error al guardar el producto:', error);
                // Manejar el error de la solicitud según sea necesario
                alert('Error al guardar el producto.');
            }
        });
    }

    else {

        Swal.fire({
            title: "Error!",
            text: "Todos los campos son requeridos",
            icon: "error"
        });
    }
}
