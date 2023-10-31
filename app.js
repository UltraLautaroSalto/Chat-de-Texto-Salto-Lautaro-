const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path'); // Agregamos el módulo 'path' para manejar rutas de archivos.

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Utilizamos 'path.join' para crear una ruta completa.
});

// Conexiones WebSocket
wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');

    // Manejo de mensajes desde el navegador
    ws.on('message', (message) => {
        console.log(`Mensaje recibido del navegador: ${message}`);

        // Reenviar el mensaje a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Iniciar el servidor en el puerto 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});