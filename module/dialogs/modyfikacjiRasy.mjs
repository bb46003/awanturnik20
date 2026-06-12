import { kompetencje } from "../config.mjs";

export class awanturnik20DialogRasy
  extends foundry.applications.api.ApplicationV2
{
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
    actions: {
      save: awanturnik20DialogRasy.#onSubmit,
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
    const os_wartosci = system.os_wartosci;
    Object.assign(context, {
      modyfikatory,
      wybor_kompetencji,
      os_wartosci,
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
          select.value = String(Number(val) + i);
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
      this.handleUniqueSelectGroup(
        row.querySelectorAll("select[name=charakter]"),
      );
    });
  }

  // =========================
  // 🔧 SUBMIT
  // =========================
  static async #onSubmit(event) {
    const app = this;
    const button = event.target;
    const root = button.closest("section");

    if (!root) return;

    // =========================
    // 📦 RESULT OBJECT
    // =========================
    const result = {
      modyfikatory: [],
      kompetencje: [],
      charakter: {
        cnoty: [],
        zalety: [],
        wady: [],
        przywary: [],
      },
    };

    // =========================
    // 🧰 HELPERS
    // =========================
    const getSelectedDataset = (select, key) => {
      const opt = select.selectedOptions?.[0];
      return opt?.dataset?.[key] ?? null;
    };

    const getSelectedValue = (select) => {
      return Number(select.value) || 0;
    };

    // =========================
    // 🧩 MODYFIKATORY
    // =========================
    const modRows = root.querySelectorAll(".mod-row");

    modRows.forEach((row) => {
      // skip other blocks
      if (row.classList.contains("kompetencje")) return;
      if (row.closest(".chakrakter")) return;

      const obniz = Array.from(
        row.querySelectorAll("select[name='cecha_do_obnizenia']"),
      ).map((el) => getSelectedDataset(el, "cecha"));

      const zmniejszenie = Array.from(
        row.querySelectorAll("select[name='zmniejszenie']"),
      ).map(getSelectedValue);

      const zwieksz = Array.from(
        row.querySelectorAll("select[name='cecha_do_zwiekszenia']"),
      ).map((el) => getSelectedDataset(el, "cecha"));

      const zwiekszenie = Array.from(
        row.querySelectorAll("select[name='zwiekszenie']"),
      ).map(getSelectedValue);

      result.modyfikatory.push({
        obniz,
        zmniejszenie,
        zwieksz,
        zwiekszenie,
      });
    });

    // =========================
    // 🧩 KOMPETENCJE
    // =========================
    const kompRows = root.querySelectorAll(".mod-row.kompetencje");

    kompRows.forEach((row) => {
      const selects = row.querySelectorAll("select");

      const values = Array.from(selects).map((el) =>
        getSelectedDataset(el, "komp"),
      );

      // remove nulls (just in case)
      result.kompetencje.push(values.filter(Boolean));
    });

    const osie_charakteru = [
      "os_pobudek",
      "os_porzadku",
      "os_egoizmu",
      "os_osadu",
      "os_pasji",
      "os_materii",
      "os_ducha",
    ];
    const charakterSelects = root.querySelectorAll("select[name='charakter']");

    charakterSelects.forEach((el) => {
      const type = Number(el.dataset.type);
      const value = Number(el.value);

      if (isNaN(type)) return;

      switch (type) {
        case 0:
          result.charakter.cnoty.push(osie_charakteru[value]);
          break;
        case 1:
          result.charakter.zalety.push(osie_charakteru[value]);
          break;
        case 2:
          result.charakter.wady.push(osie_charakteru[value]);
          break;
        case 3:
          result.charakter.przywary.push(osie_charakteru[value]);
          break;
      }
    });

    // =========================
    // 🧹 CLEAN EMPTY ENTRIES
    // =========================
    result.modyfikatory = result.modyfikatory.filter(
      (m) =>
        m.obniz.length ||
        m.zmniejszenie.some((v) => v > 0) ||
        m.zwieksz.length ||
        m.zwiekszenie.some((v) => v > 0),
    );

    // =========================
    // 💾 SAVE
    // =========================
    await app.item.setFlag("awanturnik20", "wybraneOpcje", result);

  

    app.close();
  }

}
