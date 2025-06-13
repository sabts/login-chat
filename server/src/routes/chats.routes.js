const express = require("express");
const chatRoutes = express.Router();
const chatsController = require("../controllers/chat.controller");

chatRoutes.get("/", chatsController.loadChatHistory);
chatRoutes.post("/", chatsController.saveChatHistory);

module.exports = chatRoutes;
