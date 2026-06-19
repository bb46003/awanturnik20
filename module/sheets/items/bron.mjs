import { enrich } from "../../utilities/utils.mjs";

const { api, sheets } = foundry.applications;

export class bronSheet extends api.HandlebarsApplicationMixin(
  sheets.ItemSheetV2,
) {
  constructor(...args) {
    super(...args);
      this.y = 0;
    this.item;
    this.y = 0;
  }
  static DEFAULT_OPTIONS = {
    classes: ["bron-sheet"],
    position: { width: 500, height: 520 },
    actions: {},
    form: {
      submitOnChange: true,
    },
  };
  static PARTS = {
    header: {
      template: `systems/awanturnik20/module/templates/items/bron-header.hbs`,
    },
    nav: {
      template: `systems/awanturnik20/module/templates/items/bron-nav.hbs`,
    },
    dane: {
      template: `systems/awanturnik20/module/templates/items/bron-data.hbs`,
    },
    opis: {
      template: `systems/awanturnik20/module/templates/items/bron-opis.hbs`,
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
  _processFormData(event, form, formData) {
    const target = event.target;
        const scrollEl = target.closest(".tab.active");
    if (scrollEl) {
      this._scrollTarget = scrollEl;
      this.y = scrollEl.scrollTop;
    }
      return super._processFormData(event, form, formData);

  }
  _onRender(context, options) {
  const activeTab = this.element.querySelector(".tab.active");

  if (!activeTab) return;

  activeTab.scrollTop = this.y ?? 0;
}
}
