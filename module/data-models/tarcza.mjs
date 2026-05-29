import { monety, atrybuty } from "../config.mjs";

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

export class tarczaDataModel extends foundry.abstract.TypeDataModel {
  static metadata = Object.freeze({});

  static defineSchema() {
    return {
      mod_kp: new NumberField({
        initial: 0,
        label: "awanturnik20.item.pancerz.mod_kp",
      }),
      cena: new NumberField({
        initial: 0,
        label: "awanturnik20.item.tarcza.cena",
      }),
      monety: new StringField({
        initial: "zloto",
        choices: monety,
        required: true,
      }),
      opis: new HTMLField({
        label: "awanturnik20.item.opis",
      }),
      noszona: new BooleanField({
        initial: false,
      }),
      typ: new StringField({
        initial: "lekka",
        choices: {
          lekka: "awanturnik20.item.tarcza.lekka",
          srednia: "awanturnik20.item.tarcza.srednia",
          ciezka: "awanturnik20.item.tarcza.ciezka",
        },
        required: true,
        label: "awanturnik20.item.tarcza.typ",
      }),
      modyfikatory: new SchemaField({
        rodzaj: new StringField({
          initial: "brak",
          choices: {
            utrudnienie: "awanturnik20.utrudnienie",
            ulatwienie: "awanturnik20.ulatwienie",
            brak: "-",
          },
          required: true,
        }),
        typ: new StringField({
          initial: "normalne",
          choices: {
            normalne: "awanturnik20.normalne",
            duze: "awanturnik20.duze",
          },
          required: true,
        }),
        atrybut: new StringField({
          initial: "zrecznosc",
          choices: atrybuty,
          required: true,
        }),
      }),
      rece: new StringField({
        initial: "1r",
        choices: {
          "1r": "awanturnik20.item.jednoreczna",
          "2r": "awanturnik20.item.dwureczna",
        },
        required: true,
        label: "awanturnik20.item.tarcza.reka",
      }),
    };
  }
}
