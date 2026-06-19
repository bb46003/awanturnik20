import { enrich } from "../../utilities/utils.mjs";

const { api, sheets } = foundry.applications;

export class przedmiotSheet extends api.HandlebarsApplicationMixin(
  sheets.ItemSheetV2,
) {
  constructor(...args) {
    super(...args);
    this.item;
    this.y = 0;
  }
  static DEFAULT_OPTIONS = {
    classes: ["przedmiot-sheet"],
    position: { width: 500, height: 520 },
    actions: {},
    form: {
      submitOnChange: true,
    },
  };
  static PARTS = {
    header: {
      template: `systems/awanturnik20/module/templates/items/przedmiot-header.hbs`,
    },
    opis: {
      template: `systems/awanturnik20/module/templates/items/przedmiot-main.hbs`,
    },
  };
  static TABS = {
    main: {
      tabs: [{ id: "opis", group: "main", label: "" }],

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
    _onRender(context, options) {
  const activeTab = this.element.querySelector(".tab.active");

  if (!activeTab) return;

  activeTab.scrollTop = this.y ?? 0;
}
  _processFormData(event, form, formData) {
    const target = event.target;
        const scrollEl = target.closest(".tab.active");
    if (scrollEl) {
      this._scrollTarget = scrollEl;
      this.y = scrollEl.scrollTop;
    }
      return super._processFormData(event, form, formData);

  }
}
