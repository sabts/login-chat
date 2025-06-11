const { time } = require("console");
const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const { v4 } = require("uuid");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  console.log("Usuario conectado");

  socket.on("server-message", data => {
    console.log("Mensaje recibido:", data);

    io.emit("server-message", {
      id: v4(),
      user: data.user,
      text: data.message,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id} `);
  });
});

module.exports = server;
