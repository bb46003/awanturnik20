import { enrich } from "../../utilities/utils.mjs";

const { api, sheets } = foundry.applications;

export class postacSheet extends api.HandlebarsApplicationMixin(
  sheets.ActorSheetV2,
) {
  constructor(...args) {
    super(...args);

    /** @type {CharacterActor} */
    this.actor;
  }
  static DEFAULT_OPTIONS = {
    classes: ["postac-sheet"],
    position: { width: 1020, height: 1150 },
    actions: {
      roll_iniciative: postacSheet.#rollInitiative,
      itemContextMenu: postacSheet.#itemContextMenu,
      obroc: postacSheet.#obroc,
      zaloz_pancerz: postacSheet.#zaloz_pancerz,
    },
    form: {
      submitOnChange: true,
    },
  };
  static PARTS = {
    header: {
      id: "header",
      template: "systems/awanturnik20/module/templates/actor/postac-header.hbs",
    },
    atrybuty: {
      id: "atrybuty",
      template:
        "systems/awanturnik20/module/templates/actor/postac-atrybuty.hbs",
    },
    atrybuty_pomocnicze: {
      id: "atrybuty_pomocnicze",
      template:
        "systems/awanturnik20/module/templates/actor/postac-atrybuty-pomocnicze.hbs",
    },
    nav: {
      id: "nav",
      template: "systems/awanturnik20/module/templates/actor/postac-nav.hbs",
    },
    kompetencje: {
      id: "kompetencje",
      template:
        "systems/awanturnik20/module/templates/actor/postac-kompetencje.hbs",
    },
    charakter: {
      template:
        "systems/awanturnik20/module/templates/actor/postac-charakter.hbs",
    },
    ekwipunek: {
      template:
        "systems/awanturnik20/module/templates/actor/postac-ekwipunek.hbs",
    },
    rutyny: {
      template: "systems/awanturnik20/module/templates/actor/postac-rutyny.hbs",
    },
    czary: {
      template: "systems/awanturnik20/module/templates/actor/postac-czary.hbs",
    },
    kontuzje_stany: {
      template:
        "systems/awanturnik20/module/templates/actor/postac-kontuzje_stany.hbs",
    },
    notatki: {
      template:
        "systems/awanturnik20/module/templates/actor/postac-notatki.hbs",
    },
    biografia: {
      template:
        "systems/awanturnik20/module/templates/actor/postac-biografia.hbs",
    },
  };
  static TABS = {
    main: {
      tabs: [
        { id: "charakter", group: "main", label: "" },
        { id: "ekwipunek", group: "main", label: "" },
        { id: "rutyny", group: "main", label: "" },
        { id: "czary", group: "main", label: "" },
        { id: "kontuzje_stany", group: "main", label: "" },
        { id: "notatki", group: "main", label: "" },
        { id: "biografia", group: "main", label: "" },
      ],

      initial: "ekwipunek",
    },
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    Object.assign(context, {
      actor: this.actor,
      source: this.actor.toObject(),
      system: this.actor.system,
      fields: this.actor.schema.fields,
      systemFields: this.actor.system.schema.fields,
    });
    context.historia_postaci = {
      value: this.actor.system.biografia.historia_postaci,
      enriched: await enrich(this.actor.system.biografia.historia_postaci),
      field: this.actor.system.schema.fields.biografia.fields.historia_postaci,
    };
    context.opis = {
      value: this.actor.system.biografia.opis,
      enriched: await enrich(this.actor.system.biografia.opis),
      field: this.actor.system.schema.fields.biografia.fields.opis,
    };
    context.notatki = {
      value: this.actor.system.notatki,
      enriched: await enrich(this.actor.system.notatki),
      field: this.actor.system.schema.fields.notatki,
    };
    const pancerze = await this.preparePancerz();
    Object.assign(context, { pancerze });
    const kp = await this.prepareKP();
    Object.assign(context, { kp });
    return context;
  }
  async preparePancerz() {
    const pancerz = this.actor.items.filter((item) => item.type === "pancerz");
    const data = {};
    pancerz.forEach((pancerzItem) => {
      const itemID = pancerzItem.id;
      const img = pancerzItem.img;
      const name = pancerzItem.name;
      const noszona = pancerzItem.system.noszona;
      data[itemID] = {
        img,
        name,
        noszona,
      };
    });

    return data;
  }
  async prepareKP() {
    const pancerz = this.actor.items.filter(
      (item) => item.type === "pancerz" && item.system.noszona === true,
    );
    const kp = {};
    const zr_mod = this.actor.system.atrybuty.zrecznosc.mod;
    if (pancerz[0]) {
      const max_zr = pancerz[0].system.max_zr.value;
      const mod_kp = pancerz[0].system.mod_kp;
      const stosuje_zr = pancerz[0].system.max_zr.stosuje;

      if (stosuje_zr) {
        if (zr_mod > max_zr) {
          kp.zr = max_zr;
        } else {
          kp.zr = zr_mod;
        }
      } else {
        kp.zr = 0;
      }
      kp.pancerz = mod_kp;
    } else {
      kp.zr = zr_mod;
      kp.pancerz = 0;
    }
    return kp;
  }
  static async #rollInitiative() {
    await this.actor.rollInitiative();
  }

  static async #obroc() {
    const actor = this.actor;
    const obroc = actor.system.os_charakteru;
    await actor.update({ "system.os_charakteru": !obroc });
  }
  static async #itemContextMenu(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const button = ev.target;
    const itemId = button.parentElement.dataset.itemid;
    const item = this.actor.items.get(itemId);
    // Remove old menu if exists
    document.querySelector(".custom-context-menu")?.remove();

    // Create element instead of raw string (safer and cleaner)
    const menu = document.createElement("div");
    menu.classList.add("custom-context-menu");
    const otworz = game.i18n.format(`awanturnik20.actor.otworz`, {
      type: item.type,
    });
    const usun = game.i18n.format(`awanturnik20.actor.usun`, {
      type: item.type,
    });

    menu.innerHTML = `
    <div class="menu-option" data-action="open">${otworz}</div>
    <div class="menu-option" data-action="delete">${usun}</div>
  `;
    menu.style.left = `${ev.pageX}px`;
    menu.style.top = `${ev.pageY}px`;
    document.body.appendChild(menu);
    menu.addEventListener("click", async (e) => {
      const action = e.target.dataset.action;
      if (!action) return;

      if (action === "open") {
        const item = this.actor.items.get(itemId);
        item?.sheet.render(true);
      }

      if (action === "delete") {
        const item = this.actor.items.get(itemId);
        await item?.delete();
      }

      menu.remove();
    });
  }

  static async #zaloz_pancerz(ev) {
    const target = ev.target;
    const mainDiv = target.closest(".pancerz");
    const itemID = mainDiv.dataset.itemid;
    const item = this.actor.items.get(itemID);
    const pancerz = this.actor.items.filter(
      (item) => item.type === "pancerz" && item.system.noszona === true,
    );

    const noszona = item.system.noszona;
    if (noszona === false) {
      pancerz.forEach(async (zbroja) => {
        await zbroja.update({ "system.noszona": false });
      });
    }
    await item.update({ "system.noszona": !noszona });
    this.render(true);
  }

  _processFormData(event, form, formData) {
    let name = event?.target?.name;
    if (typeof name === "string" && name.includes("charakter")) {
      formData.object[name] = Number(formData.object[name]);
    }

    return super._processFormData(event, form, formData);
  }
}
