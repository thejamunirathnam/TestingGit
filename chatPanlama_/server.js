var express = require("express");
var http = require("http");
var app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const users = {};
io.on("connection", (socket) => {
  //   socket.emit("chat-message", "hello world"); // emit an event to the socket
  socket.on("new-user", (name) => {
      users[socket.id] = name
      socket.broadcast.emit("user-connected", name);
  });

  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {message:message, name:users[socket.id]});
  });
});

server.listen(3000);
