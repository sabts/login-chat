const server = require("./controllers/chat.controller");
const port = 3000;

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
