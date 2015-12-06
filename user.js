var User = function(socket, room) {
  this.socket = socket
  this.name = "Anonymous Panda"
  this.room = room
}

User.prototype.leaveRoom = function() {
  this.room.removeUser(this)
  this.room = null
}

module.exports = User
