export class awanturnik20DialogRasy extends foundry.applications.api.DialogV2 {
  constructor({ item, type } = {}) {
    super();
    this.item = item;
    this.type = type;
  }

  static DEFAULT_OPTIONS = {
    id: "awanturnik20-dialog",
    classes: ["awanturnik20", "dialog"],
    window: {
      title: "Wybierz modyfikatory cech",
    },
    position: {
      width: 500,
      height: "auto",
    },
    buttons:[{action:"save"}],
    form: {
      handler: "onSubmit",
      submitOnChange: false,
    },
  };

  /* ----------------------------------
   * PARTS (template binding)
   * ---------------------------------- */
  static PARTS = {
    body: {
      template: "systems/awanturnik20/templates/dialogs/rasa-item-mod.hbs",
    },
    footer: {
      template: "templates/generic/form-footer.hbs",
    },
  };

  /* ----------------------------------
   * CONTEXT (THIS IS KEY PART)
   * ---------------------------------- */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    const system = this.item.system;

    const modyfikatory = system.modyfikator_cech ?? [];
    const atrybuty = CONFIG.awanturnik20?.atrybuty ?? {};

    return {
      ...context,

      item: this.item,
      modyfikatory,

      // UI-ready attribute list
      atrybutyList: Object.entries(atrybuty).map(([key, label]) => ({
        key,
        label,
      })),
    };
  }

  /* ----------------------------------
   * SUBMIT
   * ---------------------------------- */
  async onSubmit(event, form, formData) {
    const data = foundry.utils.expandObject(formData.object);

    const mods = data.modyfikator_cech ?? [];

    const result = mods.map(m => ({
      cecha_do_obnizenia: m.cecha_do_obnizenia ?? "",
      cecha_do_zwiekszenia: m.cecha_do_zwiekszenia ?? "",
      wartosc: Number(m.wartosc) || 0,
    }));

    await this.item.setFlag("awanturnik20", "rasa_modifiers", result);

    this.close();
  }
}