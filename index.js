var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/'));

// app.use('/',function(req,res,next){

// })

var onlineUserList = [];
io.on('connection', function (socket){
    socket.on('login',function(data, callback) {
        console.log(data.memberId);
        callback({
            code: 200,
            message: ''
        });
    });

    socket.on('sendMessage', function (data, callback) {
        io.sockets.emit('receiveMessage', data);
        callback({
            code: 200,
            message: ''
        });
    });

    socket.on('disconnect', function () {
        
    });
    
});
