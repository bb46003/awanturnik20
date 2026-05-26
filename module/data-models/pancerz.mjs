import { monety } from "../config.mjs";

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
      max_zr: new NumberField({
        initial: 0,
        label: "awanturnik20.item.pancerz.max_zr_label",
      }),
      cena: new NumberField({
        initial: 0,
        label: "awanturnik20.item.cena",
      }),
      monety: new StringField({
        initial: "zloto",
        choices: monety,
      }),
      opis: new HTMLField({
        label: "awanturnik20.item.opis",
      }),
      noszona: new BooleanField({
        initial: false,
      }),
    };
  }
}
