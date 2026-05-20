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
    position: { width: 1020, height: 850 },
    actions: {},
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
  };
  static TABS = {
    tabs: [
      { id: "atrybuty", group: "main", label: "" },
      { id: "atrybuty_pomocnicze", group: "main", label: "" },
      { id: "kompetencje", group: "main", label: "" },
    ],
    initial: "atrybuty",
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
    return context;
  }
}
