var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var newDate = require('date-utils');

var dt = new Date();

var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');



출처: https: //linuxism.ustd.ip.or.kr/851 [linuxism]

    //app.use('/static', express.static(__dirname + '/public'));
    app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendfile('index.html'); //default page
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

io.sockets.on('connection', function(socket) {
    //원격에서 접속이 되면 기본 응답
    console.log("connect");
    socket.emit('message_from_server', 'connect success');

    //메세지가 들어 오면 응답
    socket.on('message_from_client', function(msg) {
        console.log('message:', msg);
        // socket.emit('message_from_server', '"' + msg + '" 라고하셨군요.');
        io.emit('message_from_server', '[' + d + '] ' + msg);
    });

    socket.on('message_from_img', function(data) {
        // console.log('img:', data);
        // console.log('img:', data.);
        io.emit('message_from_img', data);
    });

    socket.on('message_from_img_around', function(data) {
        // console.log('img:', data);
        // console.log('img:', data.);
        io.emit('message_from_img_around', data);
    });

    socket.on('message_from_img_size', function(data) {
        // console.log('img:', data);
        console.log('start', data);
        io.emit('message_from_img_size', data);
    });

    socket.on('message_from_img_end', function(data) {
        console.log('end');


        socket.emit('message_from_img_end', data);
    });

});