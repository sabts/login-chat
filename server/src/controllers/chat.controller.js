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

const saveChatHistory = message => {
  const messages = loadChatHistory();
  messages.push(message);
  fs.writeFile(chatHistoryPath, JSON.stringify(messages));
};

const loadChatHistory = async (req, res) => {
  try {
    const data = await fs.readFile(chatHistoryPath);
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  } catch (error) {
    console.error("Error al leer historial:", error);
  }
};

app.get("/chat", (req, res) => {
  try {
    const history = loadChatHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener historial" });
  }
});

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
