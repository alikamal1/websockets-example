var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function () {
    console.log('Listening to requests on port 4000');

});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket connenction ', socket.id);

    socket.on('chat', function (data) {
        io.sockets.emit('chat', data); // send to all sockets
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
});
