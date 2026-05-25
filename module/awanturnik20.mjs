import { registerHandlebarsHelpers } from "./utilities/handlebars.mjs";
import { SocketHandler } from "./utilities/socketHandler.mjs";
import * as models from "./data-models/_module.mjs";
import { postacActor } from "./documents/postac.mjs";
import { postacSheet } from "./sheets/actor/postac.mjs";
import * as utils from "./utilities/utils.mjs";
import { addChatListeners } from "./chat/chat.mjs"

Hooks.once("init", async function () {
  CONFIG.Actor.documentClass = postacActor;
  CONFIG.Actor.dataModels = {
    awanturnik: models.postacDataModel,
  };
  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(
    foundry.documents.Actor,
    "core",
    foundry.applications.sheets.ActorSheet,
  );
  utils.registerSystemSheet(foundry.documents.Actor, postacSheet, "awanturnik");
  registerHandlebarsHelpers();
  game.awanturnik20 = { socketHandler: new SocketHandler() };


  console.log("AwanturniK20 został zainicjiwany");
});
Hooks.on("renderChatMessageHTML", addChatListeners);