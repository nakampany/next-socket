const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});


//test
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

//クライアントと通信
io.on("connection", (socket) => {
  console.log("a user connected");

  //クライアントから受信
  socket.on("send_message", (data) => {
    console.log(data);
    //クライアントへ返信
    io.emit("received_message", data);
  });
});

server.listen(5000, () => console.log(`server is running on 5000`));