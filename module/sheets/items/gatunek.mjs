import { enrich } from "../../utilities/utils.mjs";

const { api, sheets } = foundry.applications;

export class gatunekSheet extends api.HandlebarsApplicationMixin(
  sheets.ItemSheetV2,
) {
  constructor(...args) {
    super(...args);
    this.item;
  }
  static DEFAULT_OPTIONS = {
    classes: ["gatunek-sheet"],
    position: { width: 500, height: 520 },
    actions: {},
    form: {
      submitOnChange: true,
    },
    actions: {
      remove_kompetencja: gatunekSheet.#removeKompetencja,
      add_kompetencja: gatunekSheet.#addKompetencja,
      remove_modyfikator: gatunekSheet.#removeModyfikator,
      add_modyfikator: gatunekSheet.#addModyfikator,
      dodaj_ceche: gatunekSheet.#dodajCeche,
      usun_ceche: gatunekSheet.#usunCeche,
    },
  };
  static PARTS = {
    header: {
      template: `systems/awanturnik20/module/templates/items/gatunek-header.hbs`,
    },
    nav: {
      template: `systems/awanturnik20/module/templates/items/gatunek-nav.hbs`,
    },
    dane: {
      template: `systems/awanturnik20/module/templates/items/gatunek-data.hbs`,
    },
    opis: {
      template: `systems/awanturnik20/module/templates/items/gatunek-opis.hbs`,
    },
  };
  static TABS = {
    main: {
      tabs: [
        { id: "dane", group: "main", label: "" },
        { id: "opis", group: "main", label: "" },
      ],

      initial: "opis",
    },
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    Object.assign(context, {
      item: this.item,
      source: this.item.toObject(),
      system: this.item.system,
      fields: this.item.schema.fields,
      systemFields: this.item.system.schema.fields,
    });
    context.opis = {
      value: this.item.system.opis,
      enriched: await enrich(this.item.system.opis),
      field: this.item.system.schema.fields.opis,
    };
    context.archetyp_fabularny = {
      value: this.item.system.archetyp_fabularny,
      enriched: await enrich(this.item.system.archetyp_fabularny),
      field: this.item.system.schema.fields.archetyp_fabularny,
    };
    context.lore_etrii = {
      value: this.item.system.lore_etrii,
      enriched: await enrich(this.item.system.lore_etrii),
      field: this.item.system.schema.fields.lore_etrii,
    };
    return context;
  }

  static async #removeKompetencja(event, context) {
    const index = event.target.dataset.index;
    const kompetencje = [...this.item.system.kompetencje];
    kompetencje.splice(index, 1);
    await this.item.update({
      "system.kompetencje": kompetencje,
    });
  }
  static async #addKompetencja(event, context) {
    await this.item.update({
      "system.kompetencje": [...this.item.system.kompetencje, "dowolna"],
    });
  }
  static async #removeModyfikator(event, context) {
    const index = event.target.dataset.index;
    const modyfikatory = [...this.item.system.modyfikator_cech];
    modyfikatory.splice(index, 1);
    await this.item.update({
      "system.modyfikator_cech": modyfikatory,
    });
  }
  static async #addModyfikator(event, context) {
      await this.item.update({
      "system.modyfikator_cech":[...this.item.system.modyfikator_cech, {
        "cecha_do_obnizenie": ["sila"],
        "cecha_do_zwiekszenie": ["sila"],
        "wartosc": 0,
      }],
    });
  }
  static async #dodajCeche(event, context) {
    const index = event.target.dataset.index;
    const type = event.target.dataset.type;
    const modyfikatory = [...this.item.system.modyfikator_cech];
    modyfikatory[index][type].push("sila");
    await this.item.update({
      "system.modyfikator_cech": modyfikatory,
    });
  }
  static async #usunCeche(event, context) {
    const index = event.target.dataset.index;
    const index2 = event.target.dataset.index2;
    const type = event.target.dataset.type;
    const modyfikatory = [...this.item.system.modyfikator_cech];
    modyfikatory[index][type].splice(index2, 1);
    await this.item.update({
      "system.modyfikator_cech": modyfikatory,
    });
  } 
}

