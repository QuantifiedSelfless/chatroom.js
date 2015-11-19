var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"))

var port = process.env.PORT || 9393
http.listen(port, function() {
  console.log("Listening on *:" + port)
})