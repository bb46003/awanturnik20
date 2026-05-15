import { registerHandlebarsHelpers } from "./utilities/handlebars.mjs";
import { SocketHandler } from "./utilities/socketHandler.mjs";

Hooks.once("init", async function () {
    
    registerHandlebarsHelpers();
    game.awanturnik20 = {socketHandler: new SocketHandler()};

    console.log("AwanturniK20 został zainicjiwany");
});    