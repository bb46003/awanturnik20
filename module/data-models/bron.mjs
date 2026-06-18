import { toLabelObject } from "../utilities/utils.mjs";
import {
  kompetencje,
  monety,
  typ_obrazen,
  wlasciwosciBroni,
} from "../config.mjs";

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

export class bronDataModel extends foundry.abstract.TypeDataModel {
  static metadata = Object.freeze({});

  static defineSchema() {
    return {
      powiazana_kompetencja: new StringField({
        initial: "kunszt_w_broni_bialej",
        choices: kompetencje,
        required: true,
        label: "awanturnik20.item.bron.powiazana_kompetencja",
      }),
      zasieg: new SchemaField({
        posiada: new BooleanField({
          initial: false,
          label: "awanturnik20.item.bron.posiadaZasieg",
        }),
        pierwszy: new NumberField({
          initial: 0,
          label: "awanturnik20.item.bron.pierwszy_zasieg",
        }),
        drugi: new NumberField({
          initial: 0,
          label: "awanturnik20.item.bron.drugi_zasieg",
        }),
        trzeci: new NumberField({
          initial: 0,
          label: "awanturnik20.item.bron.trzeci_zasieg",
        }),
      }),
      cena: new NumberField({
        initial: 0,
        label: "awanturnik20.item.bron.cena",
      }),
      monety: new StringField({
        initial: "zloto",
        choices: monety,
        required: true,
      }),
      typ: new StringField({
        initial: "lekka",
        choices: {
          lekka: "awanturnik20.item.bron.lekka",
          srednia: "awanturnik20.item.bron.srednia",
          ciezka: "awanturnik20.item.bron.ciezka",
        },
        required: true,
        label: "awanturnik20.item.bron.typ",
      }),
      rece: new StringField({
        initial: "1r",
        choices: {
          "1r": "awanturnik20.item.jednoreczna",
          "2r": "awanturnik20.item.dwureczna",
          "1r_2r": "awanturnik20.item.jedno_lub_dwureczna",
        },
        required: true,
        label: "awanturnik20.item.tarcza.reka",
      }),
      trzymana: new StringField({
        initial: "1r",
        choices: {
          brak: "-",
          "1r": "awanturnik20.item.jednoreczna",
          "2r": "awanturnik20.item.dwureczna",
        },
        required: true,
        label: "awanturnik20.item.bron.reka",
      }),
      pt: new SchemaField({
        "1r": new SchemaField({
          ilosc: new NumberField({
            initial: 0,
            required: true,
            label: "awanturnik20.item.bron.ilosc_kosci_trafienia",
          }),
          typ_kosci: new StringField({
            initial: "d4",
            choices: {
              d4: "awanturnik20.item.bron.pt.d4",
              d6: "awanturnik20.item.bron.pt.d6",
              d8: "awanturnik20.item.bron.pt.d8",
              d10: "awanturnik20.item.bron.pt.d10",
              d12: "awanturnik20.item.bron.pt.d12",
              d20: "awanturnik20.item.bron.pt.d20",
            },
            required: true,
            label: "awanturnik20.item.bron.typ_kosci",
          }),
        }),
        "2r": new SchemaField({
          ilosc: new NumberField({
            initial: 0,
            required: true,
            label: "awanturnik20.item.bron.ilosc_kosci_trafienia",
          }),
          typ_kosci: new StringField({
            initial: "d4",
            choices: {
              d4: "awanturnik20.item.bron.pt.d4",
              d6: "awanturnik20.item.bron.pt.d6",
              d8: "awanturnik20.item.bron.pt.d8",
              d10: "awanturnik20.item.bron.pt.d10",
              d12: "awanturnik20.item.bron.pt.d12",
              d20: "awanturnik20.item.bron.pt.d20",
            },
            required: true,
            label: "awanturnik20.item.bron.typ_kosci",
          }),
        }),

        typ: new StringField({
          initial: "sieczne",
          choices: typ_obrazen,
          required: true,
          label: "awanturnik20.item.bron.typ_obrazen.label",
        }),
      }),
      wlasciwosci: new StringField({
        initial: "brak",
        choices: wlasciwosciBroni,
        label: "awanturnik20.item.bron.walsciwosci",
        required: true,
      }),
      opis: new HTMLField({
        label: "awanturnik20.item.opis",
      }),
    };
  }
  zmienChwyt(value) {
    console.log(value)
    this.parent.update({ "system.trzymana": value });
  }
}
