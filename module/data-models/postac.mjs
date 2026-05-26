import { toLabelObject } from "../utilities/utils.mjs";
import { kompetencje } from "../config.mjs";

const {
  StringField,
  BooleanField,
  SchemaField,
  NumberField,
  HTMLField,
  SetField,
  ArrayField,
  DocumentUUIDField,
  IntegerSortField,
} = foundry.data.fields;

export class postacDataModel extends foundry.abstract.TypeDataModel {
  static metadata = Object.freeze({});

  static defineSchema() {
    return {
      atrybuty: new SchemaField({
        sila: new SchemaField({
          value: new NumberField({
            initial: 10,
            min: 3,
            label: "awanturnik20.actor.atrybuty.sila",
          }),
          mod: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.mod",
          }),
          kompetencje: buildKompetencjeSchema("sila"),
        }),

        zrecznosc: new SchemaField({
          value: new NumberField({
            initial: 10,
            min: 3,
            label: "awanturnik20.actor.atrybuty.zrecznosc",
          }),
          mod: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.mod",
          }),
          kompetencje: buildKompetencjeSchema("zrecznosc"),
        }),

        postura: new SchemaField({
          value: new NumberField({
            initial: 10,
            min: 3,
            label: "awanturnik20.actor.atrybuty.postura",
          }),
          mod: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.mod",
          }),
          kompetencje: buildKompetencjeSchema("postura"),
        }),

        wiedza: new SchemaField({
          value: new NumberField({
            initial: 10,
            min: 3,
            label: "awanturnik20.actor.atrybuty.wiedza",
          }),
          mod: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.mod",
          }),
          kompetencje: buildKompetencjeSchema("wiedza"),
        }),

        moc: new SchemaField({
          value: new NumberField({
            initial: 10,
            min: 3,
            label: "awanturnik20.actor.atrybuty.moc",
          }),
          mod: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.mod",
          }),
          kompetencje: buildKompetencjeSchema("moc"),
        }),

        osobowosc: new SchemaField({
          value: new NumberField({
            initial: 10,
            min: 3,
            label: "awanturnik20.actor.atrybuty.osobowosc",
          }),
          mod: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.mod",
          }),
          kompetencje: buildKompetencjeSchema("osobowosc"),
        }),
      }),
      plec: new StringField({
        initial: "nieokreslona",
        label: "awanturnik20.actor.plec",
      }),
      poziom: new IntegerSortField({
        initial: 1,
        min: 1,
        label: "awanturnik20.actor.poziom",
      }),
      inicjatywa: new NumberField({
        initial: 0,
        label: "awanturnik20.actor.inicjatywa",
      }),
      ruch: new NumberField({
        initial: 0,
        label: "awanturnik20.actor.ruch",
      }),
      pd: new NumberField({
        initial: 0,
        label: "awanturnik20.actor.pd",
      }),
      kp: new NumberField({
        initial: 0,
        label: "awanturnik20.actor.kp",
      }),
      kmo: new NumberField({
        initial: 0,
        label: "awanturnik20.actor.kmo",
      }),
      pt: new SchemaField({
        value: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.pt_value",
        }),
        max: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.pt_max",
        }),
      }),
      pm: new SchemaField({
        value: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.pm_value",
        }),
        max: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.pm_max",
        }),
      }),
      charakter: new SchemaField({
        os_pobudek: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.charakter.os_pobudek",
          min: 0,
          max: 3,
        }),
        os_porzadku: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.charakter.os_porzadku",
          min: 0,
          max: 3,
        }),
        os_egoizmu: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.charakter.os_egoizmu",
          min: 0,
          max: 3,
        }),
        os_osadu: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.charakter.os_osadu",
          min: 0,
          max: 3,
        }),
        os_pasji: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.charakter.os_pasji",
          min: 0,
          max: 3,
        }),
        os_materii: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.charakter.os_materii",
          min: 0,
          max: 3,
        }),
        os_ducha: new NumberField({
          initial: 0,
          label: "awanturnik20.actor.charakter.os_ducha",
          min: 0,
          max: 3,
        }),
      }),
      monety: new SchemaField({
        miedz: new NumberField({
          initial: 0,
          min: 0,
          label: "awanturnik20.miedz",
        }),
        srebro: new NumberField({
          initial: 0,
          min: 0,
          label: "awanturnik20.srebro",
        }),
        zloto: new NumberField({
          initial: 0,
          min: 0,
          label: "awanturnik20.zloto",
        }),
      }),
      os_charakteru: new BooleanField({
        initial: false,
        label: "awanturnik20.actor.obroc",
      }),
      biografia: new SchemaField({
        wyglad: new SchemaField({
          wiek: new StringField({
            initial: "",
            label: "awanturnik20.actor.wyglad.wiek",
          }),
          waga: new StringField({
            initial: "",
            label: "awanturnik20.actor.wyglad.waga",
          }),
          wzrost: new StringField({
            initial: "",
            label: "awanturnik20.actor.wyglad.wzrost",
          }),
        }),
        opis: new HTMLField({
          label: "awanturnik20.actor.wyglad.opis",
          initial: "",
        }),
        historia_postaci: new HTMLField({
          label: "awanturnik20.actor.historia_postaci",
          initial: "",
        }),
      }),
      notatki: new HTMLField({
        label: "awanturnik20.actor.notatki.label",
      }),
    };
  }

  static get schema() {
    const schema = super.schema;
    if (foundry.utils.isEmpty(schema))
      console.error(`Schema for ${this.name} is empty.`);
    return schema;
  }
  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    this._prepareMod();
    this._prepareKP();
    this._prepareKMO();
    this._prepareInicjatywa();
    this._preparePT();
    this._preparePM();
  }

  _prepareMod() {
    const atrybuty = this.atrybuty;
    for (const key in atrybuty) {
      const atrybut = atrybuty[key];
      switch (atrybut.value) {
        case 3:
        case 4:
          atrybut.mod = -4;
          break;
        case 5:
        case 6:
          atrybut.mod = -3;
          break;
        case 7:
        case 8:
          atrybut.mod = -2;
          break;
        case 9:
        case 10:
        case 11:
          atrybut.mod = 0;
          break;
        case 12:
        case 13:
          atrybut.mod = 1;
          break;
        case 13:
        case 15:
          atrybut.mod = 2;
          break;
        case 16:
        case 17:
          atrybut.mod = 3;
          break;
        case 18:
        case 19:
          atrybut.mod = 3;
          break;
        default:
          atrybut.mod = Math.floor((atrybut.value - 10) / 2);
      }
    }
  }
  _prepareKP() {
    const zrecznosc = this.atrybuty.zrecznosc;
    let zrecznosc_mod = zrecznosc.mod;
    const pancerz = this.parent.items.filter(
      (item) => item.type === "pancerz" && item.system.noszona === true,
    );
    let mod_kp = 0;
    if(pancerz[0]){
   mod_kp = pancerz[0].system.mod_kp;
    const max_zr = pancerz[0].system.max_zr;
    if (max_zr !== 0 && zrecznosc_mod > max_zr) {
      zrecznosc_mod = max_zr;
    }
  }
    this.kp = 10 + zrecznosc_mod + mod_kp;
  }
  _prepareKMO() {
    const osobowosc = this.atrybuty.osobowosc;
    this.kmo = 10 + osobowosc.mod;
  }
  _prepareInicjatywa() {
    const zrecznosc = this.atrybuty.zrecznosc;
    this.inicjatywa = zrecznosc.mod;
  }
  _preparePT() {
    const postura = this.atrybuty.postura;
    this.pt.max = postura.mod;
  }
  _preparePM() {
    const moc = this.atrybuty.moc;
    this.pm.max = moc.mod;
  }
}
const KOMPETENCJA_FIELD = {
  initial: "niewyszkolony",
  choices: {
    niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
    adept: "awanturnik20.actor.bieglosci.adept",
    ekspert: "awanturnik20.actor.bieglosci.ekspert",
    mistrz: "awanturnik20.actor.bieglosci.mistrz",
  },
};

function buildKompetencjeSchema(atrybKey) {
  const fields = {};

  for (const [key, data] of Object.entries(kompetencje)) {
    if (data.atrybKey !== atrybKey) continue;

    fields[key] = new StringField({
      ...KOMPETENCJA_FIELD,
      label: data.label,
    });
  }

  return new SchemaField(fields);
}
