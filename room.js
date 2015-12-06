var Room = function(userLimit) {
  this.userLimit = userLimit
  this.users = []
}

Room.prototype.addUser = function(user) {
  if(this.hasRoom()) {
    user.room = this
    this.users.push(user);
    this.announceUser(user, 'new_user', {name: user.name})
    return true;
  } else { return false; }
}

Room.prototype.removeUser = function(user) {
  var index = this.users.indexOf(user)
  if(index != -1) {
    this.users.splice(index, 1)
    console.log(user)
    this.sendToAll(user, 'user_left', {name: user.name})
  }
}

Room.prototype.sendToAll = function(sender, channel, message) {
  for (i in this.users) {
    var currentUser = this.users[i]
    if(currentUser != user) {
      currentUser.socket.emit(channel, message)
    }
  }
}

Room.prototype.broadcast = function(message) {
  for (i in this.users) {
    this.users[i].emit('broadcast', message)
  }
}

Room.prototype.hasRoom = function() {
  return (this.users.length < this.userLimit)
}

module.exports = Room
