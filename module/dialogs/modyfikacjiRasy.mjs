import { kompetencje } from "../config.mjs";

export class awanturnik20DialogRasy extends foundry.applications.api.DialogV2 {
  constructor({ item, type } = {}) {
    super();
    this.item = item;
    this.type = type;
  }

  // =========================
  // 🔧 DEFAULT OPTIONS
  // =========================
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
    buttons: [{ action: "save", label: "awanturnik20.dialog.ok" }],
    form: {
      handler: "onSubmit",
      submitOnChange: true,
    },
  };

  // =========================
  // 🔧 RENDER
  // =========================
  async _renderHTML() {
    const context = await this._prepareContext(this.options);

    let content = await foundry.applications.handlebars.renderTemplate(
      this.options.template,
      context,
    );

    return content;
  }

  async _replaceHTML(result, html) {
    html.innerHTML = result;
  }

  // =========================
  // 🔧 CONTEXT
  // =========================
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    const system = this.item.system;

    const modyfikatory = system.modyfikator_cech ?? [];
    const wybor_kompetencji = await this.prepareKompetencje(
      system.kompetencje_do_wyboru ?? [],
    );

    Object.assign(context, {
      modyfikatory,
      wybor_kompetencji,
    });

    return context;
  }

  async prepareKompetencje(wybor_kompetencji) {
    const data = [];

    wybor_kompetencji.forEach((komp) => {
      const kompe = {
        ilosc_kompetencji: komp.ilosc_kompetencji,
        kompetencje: [],
      };

      komp.kompetencje.forEach((label) => {
        if (label === "dowolna") {
          for (const key in kompetencje) {
            const k = kompetencje[key];
            kompe.kompetencje.push(k.umiejkaKey);
          }
        } else {
          kompe.kompetencje.push(label);
        }
      });

      data.push(kompe);
    });

    return data;
  }

  // =========================
  // 🔧 HELPERS
  // =========================
  sumValues(selects) {
    return Array.from(selects).reduce((sum, el) => sum + Number(el.value), 0);
  }

  updateSelectOptions(select, isAllowedFn) {
    const currentValue = Number(select.value);

    Array.from(select.options).forEach((opt) => {
      const val = Number(opt.value);
      opt.disabled = !isAllowedFn(val, currentValue);
    });
  }

  bindSelectUpdate(selects, callback) {
    selects.forEach((el) => el.addEventListener("change", callback));
  }

  // =========================
  // 🔧 UNIQUE GROUP HANDLER
  // =========================
  handleUniqueSelectGroup(selects) {
    if (!selects.length) return;

    const fixInitialDuplicates = () => {
      const seen = new Set();
      let i = 1;
      selects.forEach((select) => {
        const val = select.value;
        if (!val) return;

        if (seen.has(val)) {
          select.value = String(Number(val) + 1);
          i++;
        } else {
          seen.add(val);
        }
      });
    };

    const update = () => {
      const selected = Array.from(selects)
        .map((s) => s.value)
        .filter(Boolean);

      selects.forEach((select) => {
        const current = select.value;

        Array.from(select.options).forEach((opt) => {
          if (opt.value === "" || opt.value === current) {
            opt.disabled = false;
            return;
          }

          opt.disabled = selected.includes(opt.value);
        });
      });
    };

    fixInitialDuplicates();
    this.bindSelectUpdate(selects, update);
    update();
  }

  // =========================
  // 🔧 POOL LOGIC
  // =========================
  handleZmniejszenieZwiekzenieRow(row) {
    const zmniejszenie = row.querySelectorAll("select[name='zmniejszenie']");
    const zwiekszenie = row.querySelectorAll("select[name='zwiekszenie']");
    const maxPool = Number(row.dataset.max);

    if (!zmniejszenie.length || !zwiekszenie.length) return;

    const update = () => {
      let totalDecrease = this.sumValues(zmniejszenie);
      let totalIncrease = this.sumValues(zwiekszenie);

      // ZMNIEJSZENIE
      zmniejszenie.forEach((select) => {
        const currentValue = Number(select.value);

        const remaining = maxPool - (totalDecrease - currentValue);

        this.updateSelectOptions(select, (val) => val <= remaining);

        if (currentValue >= remaining) {
          select.value = Math.max(0, remaining);
        }
      });

      totalDecrease = this.sumValues(zmniejszenie);

      // ZWIEKSZENIE
      zwiekszenie.forEach((select) => {
        const currentValue = Number(select.value);

        const remaining = totalDecrease - (totalIncrease - currentValue);

        this.updateSelectOptions(select, (val) => val <= remaining);

        if (currentValue >= remaining) {
          select.value = Math.max(0, remaining);
        }
      });
    };

    this.bindSelectUpdate(zmniejszenie, update);
    this.bindSelectUpdate(zwiekszenie, update);

    update();
  }

  // =========================
  // 🔥 RENDER HOOK
  // =========================
  _onRender() {
    const rows = this.element.querySelectorAll(".mod-row");

    rows.forEach((row) => {
      this.handleZmniejszenieZwiekzenieRow(row);

      this.handleUniqueSelectGroup(row.querySelectorAll(".kompetencje select"));

      this.handleUniqueSelectGroup(
        row.querySelectorAll("select[name='cecha_do_obnizenia']"),
      );

      this.handleUniqueSelectGroup(
        row.querySelectorAll("select[name='cecha_do_zwiekszenia']"),
      );
    });
  }

  // =========================
  // 🔧 SUBMIT
  // =========================
  async onSubmit(event, form, formData) {
    const data = foundry.utils.expandObject(formData.object);

    const mods = data.modyfikator_cech ?? [];

    const result = mods.map((m) => ({
      cecha_do_obnizenia: m.cecha_do_obnizenia ?? "",
      cecha_do_zwiekszenia: m.cecha_do_zwiekszenia ?? "",
      wartosc: Number(m.wartosc) || 0,
    }));

    await this.item.setFlag("awanturnik20", "rasa_modifiers", result);

    this.close();
  }
}
