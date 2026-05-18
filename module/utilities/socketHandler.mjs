export class SocketHandler {
  constructor() {
    this.identifier = "system.awanturnik20";
    this.registerSocketEvents();
  }
  registerSocketEvents() {
    game.socket.on("system.awanturnik20", async (data) => {
      switch (data.type) {
      }
    });
  }
}
