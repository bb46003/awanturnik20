export class postacActor extends foundry.documents.Actor {
  /** @override */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);

    if (this.type === "awanturnik") {
      await this.updateSource({
        "prototypeToken.actorLink": true,
        "prototypeToken.bar1.attribute": "pt",
        "prototypeToken.bar2.attribute": "pm",
        "prototypeToken.displayBars": 10, // Hovered by Anyone
        "prototypeToken.sight.enabled": true, // Vision enabled
        "prototypeToken.disposition": 1, // Friendly
      });
    }
  }
}
