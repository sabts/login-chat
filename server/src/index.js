const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const port = 3000;
const chatsRoutes = require("./routes/chats.routes");
const cors = require("cors");
const { Server } = require("socket.io");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/chat", chatsRoutes);

const io = new Server(server, {
  cors: corsOptions,
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
