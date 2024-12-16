import Ws from 'App/Services/Ws';

Ws.boot();

/**

* Listen for incoming socket connections

*/

Ws.io.on("connection", (socket) => {
  console.log("nuevo dispositivo conectado : " + socket.id);

  let id = socket.id;

  const {body} = socket.handshake.query;

  console.log("body del socket " + JSON.stringify(body));

  console.log("se conectó " + id);

  // socket.emit("notifications", { hello: "world" });
  socket.emit('notifications', { hello: "world" });
});

