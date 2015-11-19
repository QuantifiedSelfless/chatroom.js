var Room = function(userLimit) {
  this.userLimit = userLimit
  this.users = []
}

Room.prototype.addUser = function(user) {
  if(this.hasRoom()) {
    this.users.push(user);
    return true;
  } else { return false; }
}

Room.prototype.removeUser = function(user) {
  var index = this.users.indexOf(user)
  if(index != -1) {
    this.users.splice(index, 1)
  }
}

Room.prototype.announceUser = function(user) {
  // make sure user is in this room
  if(this.users.indexOf(user) != -1) {
    for (i in this.users) {
      var currentUser = this.users[i]
      if(currentUser != user) {
        currentUser.socket.emit('new_user', {name: currentUser.name})
      }
    }
  }
}

Room.prototype.hasRoom = function() {
  return (this.users.length < this.userLimit)
}

module.exports = Room
