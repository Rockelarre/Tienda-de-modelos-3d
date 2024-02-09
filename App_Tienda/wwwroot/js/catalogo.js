var categorias_1 = document.getElementsByClassName("categoria-1")
var categorias_2 = document.getElementsByClassName("categoria-2")
var categorias_3 = document.getElementsByClassName("categoria-3")

function categoriaTodas(event) {

    event.preventDefault()

    Array.from(categorias_1).forEach(producto => {
        producto.classList.remove("oculto")
        producto.classList.add("visible")
    });

    Array.from(categorias_2).forEach(producto => {
        producto.classList.remove("oculto")
        producto.classList.add("visible")
    });

    Array.from(categorias_3).forEach(producto => {
        producto.classList.remove("oculto")
        producto.classList.add("visible")
    });
}

function categoria1(event) {

    event.preventDefault()

    Array.from(categorias_1).forEach(producto => {
        producto.classList.remove("oculto")
        producto.classList.add("visible")
    });

    Array.from(categorias_2).forEach(producto => {
        producto.classList.remove("visible")
        producto.classList.add("oculto")
    });

    Array.from(categorias_3).forEach(producto => {
        producto.classList.remove("visible")
        producto.classList.add("oculto")
    });
}

function categoria2(event) {

    event.preventDefault()

    Array.from(categorias_1).forEach(producto => {
        producto.classList.remove("visible")
        producto.classList.add("oculto")
    });

    Array.from(categorias_2).forEach(producto => {
        producto.classList.remove("oculto")
        producto.classList.add("visible")
    });

    Array.from(categorias_3).forEach(producto => {
        producto.classList.remove("visible")
        producto.classList.add("oculto")
    });
}

function categoria3(event) {

    event.preventDefault()

    Array.from(categorias_1).forEach(producto => {
        producto.classList.remove("visible")
        producto.classList.add("oculto")
    });

    Array.from(categorias_2).forEach(producto => {
        producto.classList.remove("visible")
        producto.classList.add("oculto")
    });

    Array.from(categorias_3).forEach(producto => {
        producto.classList.remove("oculto")
        producto.classList.add("visible")
    });
}

const modals = Array.from(document.getElementsByClassName('modal'));

modals.forEach(modal => {
    window.addEventListener('DOMContentLoaded', () => {

        const nombre = modal.querySelector('.modal-nombre').textContent;
        const marca = modal.querySelector('.modal-marca').textContent;
        const categoria = modal.querySelector('.modal-categoria').textContent;
        const precio = modal.querySelector('.modal-precio').textContent;
        const descripcion = modal.querySelector('.modal-descripcion').textContent;
        const fotourl = modal.querySelector('.modal-foto-url').textContent;

        const btnAgregarCarrito = modal.querySelector('.btn-agregar-carrito');
        btnAgregarCarrito.addEventListener('click', () => {
            AgregarCarrito(event, nombre, marca, categoria, precio, descripcion, fotourl);
        });
    });
});
function AgregarCarrito(event, nombre, marca, categoria, precio, descripcion, fotourl) {

    event.preventDefault();

    var datos = {
        nombre: nombre,
        marca: marca,
        categoria: categoria,
        precio: precio,
        descripcion: descripcion,
        fotourl: fotourl
    };

    $.ajax({
        type: 'POST',
        url: 'https://localhost:7059/Productos/agregarcarrito',
        contentType: 'application/json',
        data: JSON.stringify(datos),
        success: function (response) {

            Swal.fire({
                title: "Muy bien!",
                text: "El producto se ha agregado al carrito de compras.",
                icon: "success"

            })
        },
        error: function (xhr, status, error) {
            console.error('Error al guardar el producto:', error);

            alert('Error al guardar el producto.');
        }

    })
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("modalHelicoptero").addEventListener("shown.bs.modal", function () {
        
        var iframe = document.createElement("iframe");
        iframe.src = "http://localhost:3000/";
        iframe.classList.add("cursor-3d");
        iframe.style.width = "1037px";
        iframe.style.height = "641px";
        iframe.style.borderRadius = "2rem";
        iframe.frameBorder = "0";
        iframe.classList.add("iframe");

        document.getElementById("iframeContainer").appendChild(iframe);
    });
});

function BorrarIframes(event) {

    event.preventDefault();

    var iframesborrar = document.querySelectorAll('.iframe');
    iframesborrar.forEach(function (iframe) {
        iframe.parentNode.removeChild(iframe);
    });

}
