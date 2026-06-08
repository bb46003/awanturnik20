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

    form: {
      submitOnChange: true,
    },

    actions: {
      // kompetencje (NEW - nested)
      add_kompetencje_group: gatunekSheet.#addKompetencjeGroup,
      remove_kompetencje_group: gatunekSheet.#removeKompetencjeGroup,
      add_kompetencja: gatunekSheet.#addKompetencja,
      remove_kompetencja: gatunekSheet.#removeKompetencja,

      // modyfikator_cech
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

  // =========================
  // KOMPETENCJE (NESTED)
  // =========================

  static async #addKompetencjeGroup(event, context) {
    const groups = foundry.utils.deepClone(
      this.item.system.kompetencje_do_wyboru ?? [],
    );

    groups.push({
      kompetencje: ["dowolna"],
      ilosc_kompetencji: 1,
    });

    await this.item.update({
      "system.kompetencje_do_wyboru": groups,
    });
  }

  static async #removeKompetencjeGroup(event, context) {
    const index = Number(event.target.dataset.index);

    const groups = foundry.utils.deepClone(
      this.item.system.kompetencje_do_wyboru,
    );

    groups.splice(index, 1);

    await this.item.update({
      "system.kompetencje_do_wyboru": groups,
    });
  }

  static async #addKompetencja(event, context) {
    const index = Number(event.target.dataset.index);

    const groups = foundry.utils.deepClone(
      this.item.system.kompetencje_do_wyboru,
    );

    groups[index].kompetencje.push("dowolna");

    await this.item.update({
      "system.kompetencje_do_wyboru": groups,
    });
  }

  static async #removeKompetencja(event, context) {
    const index = Number(event.target.dataset.index);
    const index2 = Number(event.target.dataset.index2);

    const groups = foundry.utils.deepClone(
      this.item.system.kompetencje_do_wyboru,
    );

    groups[index].kompetencje.splice(index2, 1);

    await this.item.update({
      "system.kompetencje_do_wyboru": groups,
    });
  }

  // =========================
  // MODYFIKATOR CECH
  // =========================

  static async #removeModyfikator(event, context) {
    const index = Number(event.target.dataset.index);

    const modyfikatory = foundry.utils.deepClone(
      this.item.system.modyfikator_cech,
    );

    modyfikatory.splice(index, 1);

    await this.item.update({
      "system.modyfikator_cech": modyfikatory,
    });
  }

  static async #addModyfikator(event, context) {
    const modyfikatory = foundry.utils.deepClone(
      this.item.system.modyfikator_cech,
    );

    modyfikatory.push({
      cecha_do_obnizenia: ["sila"],
      cecha_do_zwiekszenia: ["sila"],
      wartosc: 0,
    });

    await this.item.update({
      "system.modyfikator_cech": modyfikatory,
    });
  }

  static async #dodajCeche(event, context) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;

    const modyfikatory = foundry.utils.deepClone(
      this.item.system.modyfikator_cech,
    );

    modyfikatory[index][type].push("sila");

    await this.item.update({
      "system.modyfikator_cech": modyfikatory,
    });
  }

  static async #usunCeche(event, context) {
    const index = Number(event.target.dataset.index);
    const index2 = Number(event.target.dataset.index2);
    const type = event.target.dataset.type;

    const modyfikatory = foundry.utils.deepClone(
      this.item.system.modyfikator_cech,
    );

    modyfikatory[index][type].splice(index2, 1);

    await this.item.update({
      "system.modyfikator_cech": modyfikatory,
    });
  }
}
