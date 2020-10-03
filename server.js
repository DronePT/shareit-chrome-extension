const Koa = require("koa");
const socketio = require("socket.io");
const http = require("http");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketio(server);

const sockets = {};

const getSocketsCount = () => Object.keys(sockets).length;

io.on("connection", (socket) => {
  sockets[socket.id] = socket;

  io.emit("message", { count: getSocketsCount() });

  socket.on("disconnect", () => {
    console.warn("disconnected:", socket.id);
    delete sockets[socket.id];

    io.emit("message", { count: getSocketsCount() });
  });

  console.warn("socket connected:", socket.id);
});

server.listen(1337, () => console.warn("running :1337"));
