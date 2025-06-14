const express = require("express");
const http = require("http");
const fs = require("fs/promises");
const path = require("path");
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

const cors = require("cors");
app.use(cors());

const chatHistoryPath = path.join(__dirname, "../../data/chat-history.js");

const chatsController = {};

chatsController.saveChatHistory = async (req, res) => {
  const newMessage = req.body;
  try {
    const data = await fs.readFile(chatHistoryPath, "utf8");
    const messages = JSON.parse(data || "[]");
    messages.push(newMessage);
    await fs.writeFile(chatHistoryPath, JSON.stringify(messages, null, 2));
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error al guardar historial:", error);
    res.status(500).json({ error: "Error al guardar historial" });
  }
};

chatsController.loadChatHistory = async (req, res) => {
  try {
    const data = await fs.readFile(chatHistoryPath, "utf8");
    const jsonData = JSON.parse(data || "[]");
    res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error al leer historial:", error);
    res.status(500).json({ error: "Error al leer historial" });
  }
};

io.on("connection", socket => {
  console.log("Usuario conectado");

  socket.on("server-message", data => {
    console.log("Mensaje recibido:", data);

    const newMessage = {
      id: v4(),
      user: data.user,
      text: data.message,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    io.emit("server-message", newMessage);
    saveChatHistory(newMessage);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id} `);
  });
});

module.exports = server;
module.exports = chatsController;
