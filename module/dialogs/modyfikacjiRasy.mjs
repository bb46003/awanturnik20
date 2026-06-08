export class awanturnik20DialogRasy extends foundry.applications.api.DialogV2 {
  constructor({ item, type } = {}) {
    super();
    this.item = item;
    this.type = type;
  }

  static DEFAULT_OPTIONS = {
    id: "awanturnik20-dialog",
    classes: ["awanturnik20", "dialog", "mod-rasy"],
    window: {
      title: "awanturnik20.dialog.bonus_z_rasy",
    },
    position: {
      width: 500,
      height: "auto",
    },
    template: "systems/awanturnik20/module/templates/dialogs/rasa-item-mod.hbs",
    buttons:[{action:"save", label: "awanturnik20.dialog.ok"}],
    form: {
      handler: "onSubmit",
      submitOnChange: true,
    },
  };



  
  /** Render main dialog HTML */
  async _renderHTML() {
    const context = await this._prepareContext(this.options);
    let content = await foundry.applications.handlebars.renderTemplate(this.options.template, context);
     return content 
  }
    async _replaceHTML(result, html) {
    html.innerHTML = result;
  }
  /* ----------------------------------
   * CONTEXT (THIS IS KEY PART)
   * ---------------------------------- */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    const system = this.item.system;

    const modyfikatory = system.modyfikator_cech ?? [];
    const kompetencje =  system.kompetencje_do_wyboru ?? [];
    Object.assign(context,{modyfikatory})
    Object.assign(context, {kompetencje})
    return context
  }
_onRender() {
  const rows = this.element.querySelectorAll(".mod-row");

  rows.forEach(row => {
    const zmniejszenie = row.querySelector("select[name='zmniejszenie']");
    const zwiekszenie = row.querySelector("select[name='zwiekszenie']");

    if (!zmniejszenie || !zwiekszenie) return;

    const update = () => {
      const decValue = Number(zmniejszenie.value);
      const options = Array.from(zwiekszenie.options);

      // max value from options
      const max = Math.max(...options.map(o => Number(o.value)));

      const allowedMax = decValue;

      options.forEach(opt => {
        const val = Number(opt.value);

        if (val <= allowedMax) {
          opt.disabled = false;
        } else {
          opt.disabled = true;
        }
      });

      // fix selected value if invalid
      const current = Number(zwiekszenie.value);

      if (current >= allowedMax) {
        zwiekszenie.value = allowedMax;
      }
    };

    // bind event
    zmniejszenie.addEventListener("change", update);

    // initial run (important)
    update();
  });
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