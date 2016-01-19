var uuid = require('node-uuid');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Room = require('./room.js');
var User = require('./user.js');

var rooms = []
var defaultUserLimit = 4

function getFreeRoom() {
    for (i in rooms) {
      var room = rooms[i]
      if(room.hasRoom()) {
        return room;
      }
    }
    var newRoom = new Room(defaultUserLimit)
    rooms.push(newRoom)
    return newRoom
  }

app.use(express.static(__dirname + "/public"))

io.on('connection', function(socket) {

  // assign a room to this user
  var user = new User(socket)

  // note: users won't join any room until they identify themselves
  socket.on('howdy', function(username) {
    user.name = username
    var room = getFreeRoom()
    room.addUser(user)
    //display all users currently in room
  })
      
  socket.on('message', function(msg) {
    // process the message here.
    var messageBlob = JSON.parse(msg)
    var sender = user.name
    console.log(messageBlob)
    switch (messageBlob.type) {
      case "private_elizachat":
        sender = "Amelia"
      case "private":
        user.socket.emit('message', {name: sender + " (Private)", text: messageBlob.message})
        break;

      case "elizachat":
        sender = "Amelia"
      default:
        user.room.broadcast('message', {name: sender, text: messageBlob.message})
        break;

    }
  })

  socket.on('disconnect', function() {
    user.leaveRoom()
  })

})

var port = process.env.PORT || 9393
http.listen(port, function() {
  console.log("Listening on *:" + port)
})
