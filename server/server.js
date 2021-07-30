const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const app = express()
const router = require('./router')
const { Socket } = require('dgram')
const PORT = process.env.PORT || 5000
const server = http.createServer(app)
const io = socketio(server)
const {adduser,removeuser,getuser,getusersinroom} = require('./users')
const cors = require("cors");

app.use(cors());

io.on('connection',(socket)=>{
    console.log("new connection")
    socket.on('join',({name,room},callback)=>{
        
    
        const {error,user} = adduser({id:socket.id,name,room});
        
    if(error){
    return callback({error:'error'})}
    socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room}`})
    socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined`})
    socket.join(user.room);
    io.to(user.room).emit('roomdata',{room:user.room,users:getusersinroom(user.room)})

    callback();
});
socket.on('sendmessage',(message,callback)=>{
    
    
    const user = getuser(socket.id)
    
    io.to(user.room).emit('message',{user:user.name,text:message})
    io.to(user.room).emit('roomdata',{room:user.room,users:getusersinroom(user.room)})
    callback();
})
socket.on('disconnect', () => {
    console.log("userleft")
    const user = removeuser(socket.id);
    
    if(user) {
        
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomdata', { room: user.room, users: getusersinroom(user.room)});
    }
  })
});
app.use(router)

server.listen(PORT,()=> console.log(`server is running in port no. ${PORT}`))