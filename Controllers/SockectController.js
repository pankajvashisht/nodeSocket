const sockets = (server) => {
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {        
        socket.on('disconnect', (user_id) => {
            console.log("users leave the room");
            socket.leave(user_id)
        });
       
        socket.on('ConncetedChat', (user_id) => {
            socket.join(user_id);
            socket.broadcast.to(user_id).emit('ConncetedChat', user_id);    
        });
    
        socket.on('newMessage', (id,message) => {
            socket.broadcast.to(id.id).emit('newMessage', id , message);
        });

        socket.on('leaveChat', (id) => {
            socket.leave(id); 
            socket.broadcast.to(id).emit('leaveChat', id);        
        });
        socket.on('type', (id,typing) => {
            socket.broadcast.to(id.room_id).emit('type', id , typing);
        });
        socket.on('error', function (err) {
            console.log('received socket error:')
            console.log(err)
        })
      });
}
module.exports = sockets; 