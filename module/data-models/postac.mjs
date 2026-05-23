import { toLabelObject } from "../utilities/utils.mjs";

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
          kompetencje: new SchemaField({
            kusznt_w_broni_białej: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label:
                "awanturnik20.actor.atrybuty.kompetencje.kunszt_w_broni_bialej",
            }),
            mieszane_sztuki_walki: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label:
                "awanturnik20.actor.atrybuty.kompetencje.mieszane_sztuki_walki",
            }),
            sprawnosc_fizyczna: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label:
                "awanturnik20.actor.atrybuty.kompetencje.sprawnosc_fizyczna",
            }),
          }),
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
          kompetencje: new SchemaField({
            celnosc: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.celnosc",
            }),
            cichociemny: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.cichociemny",
            }),
            spryt: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.spryt",
            }),
          }),
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
          kompetencje: new SchemaField({
            przyswajanie_substancji: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label:
                "awanturnik20.actor.atrybuty.kompetencje.przyswajanie_substancji",
            }),
            skupienie: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.skupienie",
            }),
            wytrzymalosc: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.wytrzymalosc",
            }),
          }),
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
          kompetencje: new SchemaField({
            inzynieria: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.inzynieria",
            }),
            laczenie_kropek: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.laczenie_kropek",
            }),
            medycynaa: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.medycyna",
            }),
            nauki_przyrodnicze: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label:
                "awanturnik20.actor.atrybuty.kompetencje.nauki_przyrodnicze",
            }),
            nauki_spoleczne: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.nauki_spoleczne",
            }),
            percepcja: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.percepcja",
            }),
            rzemioslo: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.rzemioslo",
            }),
            szkola_przetrwania: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label:
                "awanturnik20.actor.atrybuty.kompetencje.szkola_przetrwania",
            }),
            szwindel: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.szwindel",
            }),
            tortury: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.tortury",
            }),
            wlam: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.wlam",
            }),
          }),
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
          kompetencje: new SchemaField({
            intuicja: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.intuicja",
            }),
            jezyki_tajemne: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.jezyki_tajemne",
            }),
            mistycyzm: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.mistycyzm",
            }),
            okultyzm: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.okultyzm",
            }),
            przelamanie_mo: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.przelamanie_mo",
            }),
            talent: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.talent",
            }),
            trans: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.trans",
            }),
          }),
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
          kompetencje: new SchemaField({
            blef: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.blef",
            }),
            etykieta: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.etykieta",
            }),
            grypsera: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.grypsera",
            }),
            przesluchiwanie: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.przesluchiwanie",
            }),
            podejscie_do_zwierzat: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label:
                "awanturnik20.actor.atrybuty.kompetencje.podejscie_do_zwierzat",
            }),
            retoryka: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.retoryka",
            }),
            uwodzenie: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.uwodzenie",
            }),
            zastraszanie: new StringField({
              initial: "niewyszkolony",
              choices: {
                niewyszkolony: "awanturnik20.actor.bieglosci.niewyszkolony",
                adept: "awanturnik20.actor.bieglosci.adept",
                ekspert: "awanturnik20.actor.bieglosci.ekspert",
                mistrz: "awanturnik20.actor.bieglosci.mistrz",
              },
              label: "awanturnik20.actor.atrybuty.kompetencje.zastraszanie",
            }),
          }),
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
          label: "awanturnik20.actor.miedz",
        }),
        srebro: new NumberField({
          initial: 0,
          min: 0,
          label: "awanturnik20.actor.srebro",
        }),
        zloto: new NumberField({
          initial: 0,
          min: 0,
          label: "awanturnik20.actor.zloto",
        }),
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
    this.kp = 10 + zrecznosc.mod;
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
