const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const http = require("http");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  console.log("Usuario conectado");

  socket.on("message", data => {
    console.log("Mensaje recibido:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

app.use(cors(corsOptions));
app.use(express.json());

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
