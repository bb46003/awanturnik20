import { enrich } from "../../utilities/utils.mjs";
import { bronSheet } from "../items/bron.mjs";
import { przedmiotDataModel } from "../../data-models/przedmiot.mjs";
import { awanturnik20DialogRasy } from "../../dialogs/modyfikacjiRasy.mjs";

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
      changeIlosc: postacSheet.#changeIlosc,
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
    const tarcze = await this.prepareTarcze();
    Object.assign(context, { tarcze });
    const kp = await this.prepareKP();
    Object.assign(context, { kp });
    const bronie = await this.prepareBron();
    Object.assign(context, { bronie });
    const przedmioty = await this.preparePrzedmioty();
    Object.assign(context, { przedmioty });
    const rasa = await this.prepareRasa();
    Object.assign(context, { rasa });
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
      const modifikatorChoices =
        pancerzItem.system.schema.fields.modyfikatory.fields.rodzaj.choices;
      const modyfikator =
        modifikatorChoices[pancerzItem.system.modyfikatory.rodzaj];
      const modifikatorTypChoices =
        pancerzItem.system.schema.fields.modyfikatory.fields.typ.choices;
      const modyfikatorTyp =
        modifikatorTypChoices[pancerzItem.system.modyfikatory.typ];
      const rodzaj = pancerzItem.system.modyfikatory.rodzaj;
      const atrybutChoice =
        pancerzItem.system.schema.fields.modyfikatory.fields.atrybut.choices;
      const atrybut = atrybutChoice[pancerzItem.system.modyfikatory.atrybut];
      data[itemID] = {
        img,
        name,
        noszona,
        rodzaj,
        modyfikator,
        modyfikatorTyp,
        atrybut,
      };
    });

    return data;
  }
  async prepareTarcze() {
    const tarcza = this.actor.items.filter((item) => item.type === "tarcza");
    const data = {};
    tarcza.forEach((tarczaItem) => {
      const itemID = tarczaItem.id;
      const img = tarczaItem.img;
      const name = tarczaItem.name;
      const noszona = tarczaItem.system.noszona;
      const modifikatorChoices =
        tarczaItem.system.schema.fields.modyfikatory.fields.rodzaj.choices;
      const modyfikator =
        modifikatorChoices[tarczaItem.system.modyfikatory.rodzaj];
      const modifikatorTypChoices =
        tarczaItem.system.schema.fields.modyfikatory.fields.typ.choices;
      const modyfikatorTyp =
        modifikatorTypChoices[tarczaItem.system.modyfikatory.typ];
      const rodzaj = tarczaItem.system.modyfikatory.rodzaj;
      const atrybutChoice =
        tarczaItem.system.schema.fields.modyfikatory.fields.atrybut.choices;
      const atrybut = atrybutChoice[tarczaItem.system.modyfikatory.atrybut];
      const receChoices = tarczaItem.system.schema.fields.rece.choices;
      const rece = receChoices[tarczaItem.system.rece];
      data[itemID] = {
        img,
        name,
        noszona,
        rodzaj,
        modyfikator,
        modyfikatorTyp,
        atrybut,
        rece,
      };
    });

    return data;
  }
  async prepareKP() {
    const pancerz = this.actor.items.filter(
      (item) => item.type === "pancerz" && item.system.noszona === true,
    );
    const tarcza = this.actor.items.filter(
      (item) => item.type === "tarcza" && item.system.noszona === true,
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
    if (tarcza[0]) {
      kp.tarcza = tarcza[0].system.mod_kp;
    } else {
      kp.tarcza = 0;
    }
    return kp;
  }
  async prepareBron() {
    const bronie = this.actor.items.filter((item) => item.type === "bron");
    const data = {};
    bronie.forEach((bronItem) => {
      const itemID = bronItem.id;
      const img = bronItem.img;
      const name = bronItem.name;
      const trzymana = bronItem.system.trzymana;
      const rece = bronItem.system.rece;
      let pt = { trzymana: false };
      if (trzymana !== "brak") {
        pt = bronItem.system.pt[trzymana];
        pt.trzymana = true;
      }
      const typ_pt = bronItem.system.pt.typ;
      const wlasciwosci = bronItem.system.wlasciwosci;
      data[itemID] = {
        img,
        name,
        trzymana,
        rece,
        pt,
        typ_pt,
        wlasciwosci,
      };
    });
    return data;
  }
  async preparePrzedmioty() {
    const przedmioty = this.actor.items.filter(
      (item) => item.type === "przedmiot",
    );
    const data = {};
    przedmioty.forEach((przedmiotItem) => {
      const itemID = przedmiotItem.id;
      const img = przedmiotItem.img;
      const name = przedmiotItem.name;
      const waga = przedmiotItem.system.waga;
      const ilosc = przedmiotItem.system.ilosc;
      data[itemID] = {
        img,
        name,
        waga,
        ilosc,
      };
    });
    return data;
  }
  async prepareRasa() {
    const rasa = this.actor.items.filter((item) => item.type === "gatunek")[0];
    let data = { id: "", name: "Brak" };
    if (rasa) {
      data = {
        id: rasa.id,
        name: rasa.name,
      };
    }
    return data;
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
    const itemId = button.dataset.item;
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
    const edytuj = game.i18n.format(`awanturnik20.actor.edytuj`, {
      type: item.type,
    });

    menu.innerHTML = `
    <div class="menu-option" data-action="open">${otworz}</div>
    <div class="menu-option" data-action="delete">${usun}</div>
  `;
    if (item.type === "gatunek") {
      menu.innerHTML += `<div class="menu-option" data-action="edit">${edytuj}</div>`;
    }
    menu.style.left = `${ev.pageX}px`;
    menu.style.top = `${ev.pageY}px`;
    document.body.appendChild(menu);
    menu.addEventListener("click", async (e) => {
      const action = e.target.dataset.action;
      if (!action) return;

      if (action === "open") {
        const item = await this.actor.items.get(itemId);
        item?.sheet.render(true);
      }

      if (action === "delete") {
        const item = await this.actor.items.get(itemId);
        await item?.delete();
      }
      if (action === "edit") {
        const item = await this.actor.items.get(itemId);
        const dialog = new awanturnik20DialogRasy({ type: "rasa", item: item });
        dialog.render({ force: true });
      }

      menu.remove();
    });
    setTimeout(() => {
      document.addEventListener("click", () => menu.remove(), { once: true });
    }, 10);
  }
  static async #zaloz_pancerz(ev) {
    const target = ev.target;
    const mainDiv = target.closest(".pancerz-row");
    const itemID = mainDiv.dataset.itemid;
    const selectItem = this.actor.items.get(itemID);
    const pancerz = this.actor.items.filter(
      (item) => item.type === selectItem.type && item.system.noszona === true,
    );

    const noszona = selectItem.system.noszona;
    if (noszona === false) {
      pancerz.forEach(async (zbroja) => {
        await zbroja.update({ "system.noszona": false });
      });
    }
    await selectItem.update({ "system.noszona": !noszona });
    this.render(true);
  }
  static async #changeIlosc(ev) {
    const target = ev.target.parentElement;
    const itemID = target.dataset.item;
    const item = this.actor.items.get(itemID);
    const change = Number(target.dataset.change);
    const newIlosc =
      item.system.ilosc + change < 0 ? 0 : item.system.ilosc + change;
    await item.update({ "system.ilosc": newIlosc });
  }

  _processFormData(event, form, formData) {
    let name = event?.target?.name;
    if (typeof name === "string" && name.includes("charakter")) {
      formData.object[name] = Number(formData.object[name]);
    }
    const target = event?.target;
    if (target.dataset.action === "changeTrzymana") {
      const item = this.actor.items.get(target.dataset.item);
      item.system.zmienChwyt(target.value);
    }
    if (target.dataset.action === "zmianaIlosci") {
      const item = this.actor.items.get(target.dataset.item);
      const newIlosc = Number(target.value);
      item.update({ "system.ilosc": newIlosc });
    }

    return super._processFormData(event, form, formData);
  }
  async _onDrop(event) {
    event.preventDefault();

    const data = event.dataTransfer;
    const actor = this.actor;
    if (!data) return;

    const droppedItem = JSON.parse(data.getData("text/plain"));
    if (droppedItem.type !== "Item") return;

    const itemDoc = await fromUuid(droppedItem.uuid);
    let itemData = itemDoc.toObject(); // IMPORTANT

    switch (itemData.type) {
      case "gatunek":
        const maGatunek = this.actor.items.filter(
          (item) => item.type === "gatunek",
        );
        if (maGatunek.length > 0) {
          ui.notifications.warn(
            game.i18n.localize("awanturnik20.ui.warn.ma_gatunek"),
          );
        } else {
          const dialog = new awanturnik20DialogRasy({
            type: "rasa",
            item: itemDoc,
          });
          console.log(dialog);
          dialog.render({ force: true });
          await actor.createEmbeddedDocuments("Item", [itemData]);
        }
        break;
      default:
        await actor.createEmbeddedDocuments("Item", [itemData]);
        break;
    }
  }
}
