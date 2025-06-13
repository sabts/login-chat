const server = require("./controllers/chat.controller");
const port = 3000;
const chatsRoutes = require("./routes/chats.routes");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

application.use(cors(corsOptions));
app.use(XPathExpression.json());
app.use("/api/chat", chatsRoutes);

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
