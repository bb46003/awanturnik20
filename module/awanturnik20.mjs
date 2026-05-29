import { registerHandlebarsHelpers } from "./utilities/handlebars.mjs";
import { SocketHandler } from "./utilities/socketHandler.mjs";
import * as models from "./data-models/_module.mjs";
import { postacActor } from "./documents/postac.mjs";
import { postacSheet } from "./sheets/actor/postac.mjs";
import * as utils from "./utilities/utils.mjs";
import { addChatListeners } from "./chat/chat.mjs";
import { awanturnik20Item } from "./documents/awanturnik20Item.mjs";
import * as ItemSheets from "./sheets/items/_module.mjs";

Hooks.once("init", async function () {
  CONFIG.Actor.documentClass = postacActor;
  CONFIG.Item.documentClass = awanturnik20Item;
  CONFIG.Actor.dataModels = {
    awanturnik: models.postacDataModel,
  };
  CONFIG.Item.dataModels = {
    pancerz: models.pancerzDataModel,
    tarcza: models.tarczaDataModel,
    bron: models.bronDataModel,
  };
  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(
    foundry.documents.Actor,
    "core",
    foundry.applications.sheets.ActorSheet,
  );
  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(
    foundry.documents.Item,
    "core",
    foundry.applications.sheets.ItemSheetV2,
  );
  utils.registerSystemSheet(foundry.documents.Actor, postacSheet, "awanturnik");
  utils.registerSystemSheet(
    foundry.documents.Item,
    ItemSheets.pancerzSheet,
    "pancerz",
  );
  utils.registerSystemSheet(
    foundry.documents.Item,
    ItemSheets.tarczaSheet,
    "tarcza",
  );
  registerHandlebarsHelpers();
  game.awanturnik20 = { socketHandler: new SocketHandler() };

  console.log("AwanturniK20 został zainicjiwany");
});
Hooks.on("renderChatMessageHTML", addChatListeners);
