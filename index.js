var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 2998;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

var onlineUserList = [];

io.on('connection', function (socket) {

    socket.on('login', function (data, callback) {
        var isExit = false;
        for (var i = 0; i < onlineUserList.length; i++) {
            if (onlineUserList[i].id == data.id) {
                isExit = true;

                break;
            }
        }

        if (isExit) {
            callback({
                code: 400,
                message: 'the user has login'
            });
        } else {
            onlineUserList.push({
                id: data.id,
                socket: socket
            });
        }
    });

    socket.on('sendMessage', function (data, callback) {
        if (!data.targetId) {
            callback({
                code: 400,
                message: 'targetId is null'
            });
        }

        var index = -1;
        for (var i = 0; i < onlineUserList.length; i++) {
            if (onlineUserList[i].id == data.targetId) {
                index = i;

                break;
            }
        }

        if (index > -1) {
            onlineUserList[i].sockets.emit('receiveMessage', {
                code: 200,
                data: {
                    content: data.content
                }
            });
        } else {
            callback({
                code: 400,
                message: 'this user is not found'
            });
        }
    });

    socket.on('disconnect', function () {

    });
})
