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
        if (typeof(data.id) == 'undefined') {
            callback({
                code: 400,
                message: 'id is null'
            });

            return;
        }

        var isExit = false;
        for (var i = 0; i < onlineUserList.length; i++) {
            if (onlineUserList[i].id == data.id) {
                isExit = true;

                break;
            }
        }

        socket.id = data.id;

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

            callback({
                code: 200
            });
        }
    });

    socket.on('sendMessage', function (data, callback) {
        if (typeof(data.targetId) == 'undefined') {
            callback({
                code: 400,
                message: 'targetId is null'
            });

            return;
        }

        var index = -1;
        for (var i = 0; i < onlineUserList.length; i++) {
            if (onlineUserList[i].id == data.targetId) {
                index = i;

                break;
            }
        }

        if (index > -1) {
            onlineUserList[i].socket.emit('receiveMessage', {
                code: 200,
                data: {
                    action: data.action,
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
        var index = -1;
        for (var i = 0; i < onlineUserList.length; i++) {
            if (onlineUserList[i].socket.id == socket.id) {
                index = i;
            }
        }

        if (index > -1) {
            onlineUserList.splice(index, 1);
        }
    });
})
