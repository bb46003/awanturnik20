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

export class pancerzDataModel extends foundry.abstract.TypeDataModel {
  static metadata = Object.freeze({});

  static defineSchema() {
    return {
      mod_kp: new NumberField({
        initial: 0,
        label: "awanturnik20.item.pancerz.mod_kp",
      }),
      max_zr: new SchemaField({
        value: new NumberField({
          initial: 0,
          label: "awanturnik20.item.pancerz.max_zr_label",
        }),
        stosuje: new BooleanField({
          initial: true,
          label: "awanturnik20.item.pancerz.stosuje_zr",
        }),
      }),
      cena: new NumberField({
        initial: 0,
        label: "awanturnik20.item.cena",
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
          lekka: "awanturnik20.item.pancerz.lekka",
          srednia: "awanturnik20.item.pancerz.srednia",
          ciezka: "awanturnik20.item.pancerz.ciezka",
        },
        required: true,
        label: "awanturnik20.item.pancerz.typ",
      }),
      modyfikatory: new SchemaField({
        rodzaj: new StringField({
          initial: "utrudnienie",
          choices: {
            utrudnienie: "awanturnik20.utrudnienie",
            ulatwienie: "awanturnik20.ulatwienie",
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
    };
  }
}
