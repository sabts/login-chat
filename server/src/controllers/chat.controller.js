const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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
    console.log(`Usuario desconectado: ${socket.id} `);
  });
});

module.exports = server;
