import express from 'express';
import handlerbars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routers/views.router.js';

// Inicialización de la app
const app = express();
const messages = [];

// Middelare para parseo de json
app.use(express.json());
// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

// Set handlebars
app.engine('handlebars', handlerbars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

// Seteo el directorio de archivos estáticos
app.use(express.static('public'));

// Rutas
app.use('/', viewsRouter);

// Inicialización del servidor
const webServer = app.listen(8080, () => {
	console.log('Escuchando 8080');
});

// Inicialización de socket.io
const io = new Server(webServer);

io.on('connection', (socket)=>{
    console.log("nuevo cliente conectado");

    socket.emit('messages', messages);

    socket.on('message',(message)=>{
        console.log(message);
        messages.push(message);
        io.emit('messages', messages);
    });

    socket.on('sayhello', (data)=>{
        console.log("desde el servidor" + data);
        socket.broadcast.emit('conectado', data);
    })
})

