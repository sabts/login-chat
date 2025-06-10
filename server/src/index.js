const server = require("./controllers/chat.controller");

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
