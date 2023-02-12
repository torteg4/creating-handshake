const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const port = 8000;
app.use(cors());

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

// to initialize the socket, we need to invoke a new instance
//     of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client
    //     has successfully completed the handshake!
    console.log('socket id: ' + socket.id);
    console.log("Nice to meet you. (shake hand)");
    
    // We add our additional event listeners right inside this function
    // NOTE: "connection" is a BUILT IN events listener
});

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    
    socket.on("event_from_client", data => {
        // send a message with "data" to ALL clients EXCEPT for the one that emitted the
    	//     "event_from_client" event
        socket.broadcast.emit("event_to_all_other_clients", data);
        console.log("Simple welcome message");
    });
});