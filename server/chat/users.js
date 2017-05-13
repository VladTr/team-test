module.exports = function (client, userlist) {
  client.on('new user', function (data, callback) {
    if (userlist.indexOf(data)!==-1){
      callback(false);
    }else{
      callback(true);
      client.nickname = data;
      userlist.push(client.nickname);
      updateUserList();
    }
  });

  client.on('disconnect',function (data) {
    console.log('disconnected: '+data);
    if(!client.nickname)return;
    userlist.splice(userlist.indexOf(client.nickname), 1);
    console.log('disconnected: '+client.nickname);
    updateUserList()
  });

  function updateUserList() {
    client.broadcast.emit('usernames',userlist);
  }
};

