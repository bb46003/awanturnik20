import { enrich } from "../../utilities/utils.mjs";

const { api, sheets } = foundry.applications;

export class pancerzSheet extends api.HandlebarsApplicationMixin(
  sheets.ItemSheetV2,
) {
  constructor(...args) {
    super(...args);
    this.item;
  }
  static DEFAULT_OPTIONS = {
    classes: ["pancerz-sheet"],
    position: { width: 500, height: 550 },
    actions: {},
    form: {
      submitOnChange: true,
    },
  };
  static PARTS = {
    header: {
      template: `systems/awanturnik20/module/templates/items/pancerz-header.hbs`,
    },
    nav: {
      template: `systems/awanturnik20/module/templates/items/pancerz-nav.hbs`,
    },
    dane: {
      template: `systems/awanturnik20/module/templates/items/pancerz-data.hbs`,
    },
    opis: {
      template: `systems/awanturnik20/module/templates/items/pancerz-opis.hbs`,
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
    return context;
  }
}
