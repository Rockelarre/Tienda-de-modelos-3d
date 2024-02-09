const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();
const port = 3000;

// Configurar el middleware para servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configurar la CSP con helmet
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://example.com'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://example.com'],
            // Añade más directivas según tus necesidades
        },
    })
);

// Configurar una ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Node.js corriendo en http://localhost:${port}`);
});