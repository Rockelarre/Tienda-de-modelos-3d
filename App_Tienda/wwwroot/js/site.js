
function Register(event) {

    event.preventDefault()

    localStorage.removeItem('accessToken');

    var nombre = document.getElementById("nombre").value;
    var primerapellido = document.getElementById("primerapellido").value;
    var segundoapellido = document.getElementById("segundoapellido").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("confirmpassword").value;

    $.ajax({
        url: 'https://localhost:7059/api/auth/create',
        type: 'POST',
        contentType: 'application/json',
        headers: {
        },
        data: JSON.stringify({
            nombre: nombre,
            primerapellido: primerapellido,
            segundoapellido: segundoapellido,
            email: email,
            password: password,
            confirmpassword: confirmpassword
        }),
        success: function (response) {

            Swal.fire({
                title: "Felicitaciones!",
                text: "Se ha registrado exitosamente.",
                icon: "success"

            }).then((result) => {
               if (result.isConfirmed) {
                   window.location.href = 'https://localhost:7059/login/login';
                }
            });
        },
        error: function (error) {
            console.error('Error en la solicitud Ajax:', error);
        }
    });
}

function Login(event) {

    event.preventDefault()

    localStorage.removeItem('accessToken');

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    $.ajax({
        url: 'https://localhost:7059/api/auth/login',
        type: 'POST',
        contentType: 'application/json',
        headers: {
        },
        data: JSON.stringify({
            nombre: "",
            primerapellido: "",
            segundoapellido: "",
            email: email,
            password: password,
            confirmpassword: ""
        }),
        success: function (response) {

            localStorage.setItem('accessToken', response);

            Swal.fire({
                title: "Felicitaciones!",
                text: "Ha ingresado exitosamente.",
                icon: "success"

            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'https://localhost:7059/productos/catalogo';
                }
            });
        },
        error: function (error) {
            console.error('Error en la solicitud Ajax:', error);
        }
    });
}

function IrCarrito(event) {

    event.preventDefault()

    var token = localStorage.getItem('accessToken');

    $.ajax({
        url: 'https://localhost:7059/productos/vercarrito',
        type: 'GET',
        headers: {
            'Authorization': token
        },
        success: function (response) {
            
            if (response.claims[3].value == "User") {
                window.location.href = 'https://localhost:7059/productos/carrito';
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: "No tiene autorización para ver esta página, inicie sesión como usuario.",
                    icon: "error"

                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'https://localhost:7059/login/login';
                    }
                });
            }
        },
        error: function (error) {
            Swal.fire({
                title: "Error!",
                text: "No tiene autorización para ver esta página, inicie sesión como usuario.",
                icon: "error"

            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'https://localhost:7059/login/login';
                }
            });
        }
    });
}

function IrSubirProducto(event) {

    event.preventDefault()

    var token = localStorage.getItem('accessToken');

    $.ajax({
        url: 'https://localhost:7059/productos/versubirproducto',
        type: 'GET',
        headers: {
            'Authorization': token
        },
        success: function (response) {

            if (response.claims[3].value == "Admin") {
                window.location.href = 'https://localhost:7059/productos/subirproducto';
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: "No tiene autorización para ver esta página, inicie sesión como administrador.",
                    icon: "error"

                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'https://localhost:7059/login/login';
                    }
                });
            }
        },
        error: function (error) {
            Swal.fire({
                title: "Error!",
                text: "No tiene autorización para ver esta página, inicie sesión como administrador.",
                icon: "error"

            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'https://localhost:7059/login/login';
                }
            });
        }
    });
}

function Logout(event) {

    
}