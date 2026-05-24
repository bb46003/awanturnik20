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
      obroc: postacSheet.#obroc,
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
  };
  static TABS = {
    main: {
      tabs: [
        { id: "charakter", group: "main", label: "" },
        { id: "ekwipunek", group: "main", label: "" },
        { id: "rutyny", group: "main", label: "" },
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
    return context;
  }

  static async #rollInitiative() {
    await this.actor.rollInitiative();
  }
  _processFormData(event, form, formData) {
    let name = event?.target?.name;
    if (typeof name === "string" && name.includes("charakter")) {
      formData.object[name] = Number(formData.object[name]);
    }

    return super._processFormData(event, form, formData);
  }

  static async #obroc() {
    const actor = this.actor;
    const obroc = actor.system.os_charakteru;
    await actor.update({ "system.os_charakteru": !obroc });
  }
}
