
$(document).ready(function () {
    $('#fotoInput').change(function () {

        var nombreArchivo = $(this).val().split('\\').pop();
        $('#fotoNombreArchivo').val(nombreArchivo);

    });
});

$(document).ready(function () {
    $('#modelo3dInput').change(function () {
        var archivo = $(this)[0].files[0]; 
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

        $.ajax({
            type: 'POST',
            url: 'https://localhost:7147/api/Productos',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {
                console.log('Producto guardado exitosamente:', response);
                
                var formData = new FormData(); 
                var archivo = $('#fotoInput')[0].files[0];

                formData.append('archivo', archivo);

                $.ajax({
                    url: '/Productos/SubirArchivo',
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
