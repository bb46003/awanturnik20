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
            kusznt_w_broni_białej: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.kusznt_w_broni_białej",
            }),
            mieszane_sztuki_walki: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.mieszane_sztuki_walki",
            }),
            sprawnosc_fizyczna: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.sprawnosc_fizyczna",
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
            celnosc: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.celnosc",
            }),
            cichociemny: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.cichociemny",
            }),
            spryt: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.spryt",
           })
          })
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
            przyswajanie_substancji: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.przyswajanie_substancji",
            }),
            skupienie: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.skupienie",
            }),
            wytrzymalosc: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.wytrzymalosc",
           })
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
            inzynieria: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.inzynieria",
            }),
            laczenie_kropek: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.laczenie_kropek",
            }),
            medycynaa: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.medycynaa",
           }),
           nauki_przyrodnicze: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.nauki_przyrodnicze",
           }),
           nauki_spoleczne: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.nauki_spoleczne",
           }),
           percepcja: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.percepcja",
           }),
           rzemioslo: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.rzemioslo",
           }),
           szkola_przetrwania: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.szkola_przetrwania",
           }),
           szwindel: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.szwindel",
           }),
           tortury: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.tortury",
           }),
           wlam: new NumberField({
            initial: 0,
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
            intuicja: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.intuicja",
            }),
            jezyki_tajemne: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.jezyki_tajemne",
            }),
            mistycyzm: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.mistycyzm", 
            }),
            okultyzm: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.okultyzm",
            }),
            przelamanie_mo: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.przelamanie_mo",
            }),
            talent: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.talent",
            }),
            trans: new NumberField({
              initial: 0,
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
            blef: new NumberField({
              initial: 0,
              label: "awanturnik20.actor.atrybuty.kompetencje.blef",
          }),
          etykieta: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.etykieta",
          }),
          grypsera: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.grypsera",
          }),
          przesluchiwanie: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.przesluchiwanie",
          }),
          podejscie_do_zwierzat: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.podejscie_do_zwierzat",
          }),
          retoryka: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.retoryka",
          }),
          uwodzenie: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.uwodzenie",
          }), 
          zastraszanie: new NumberField({
            initial: 0,
            label: "awanturnik20.actor.atrybuty.kompetencje.zastraszanie",
          }),
        })
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
      pt: new NumberField({
        initial: 0,
        label: "awanturnik20.actor.pt",
      }),
      pm: new NumberField({
        initial: 0,
        label: "awanturnik20.actor.pm",
      }),

    }
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
  }

  _prepareMod() {
    const atrybuty = this.atrybuty;
    for (const key in atrybuty) {
      const atrybut = atrybuty[key];
      if (atrybut.value < 9) {
        atrybut.mod = Math.floor((atrybut.value - 10.5) / 2);
      } else if (atrybut.value === 9) {
        atrybut.mod = Math.ceil((atrybut.value - 9.5) / 2);
      }else{
        atrybut.mod = Math.floor((atrybut.value - 9.5) / 2);
      }
    }
  }

}