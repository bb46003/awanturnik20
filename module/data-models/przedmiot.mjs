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

export class przedmiotDataModel extends foundry.abstract.TypeDataModel {
  static metadata = Object.freeze({});

  static defineSchema() {
    return {
      waga: new NumberField({
        initial: 0,
        label: "awanturnik20.item.przedmiot.waga",
      }),
      opis: new HTMLField({
        initial: "",
        label: "awanturnik20.item.opis",
      }),
      cena: new NumberField({
        initial: 0,
        label: "awanturnik20.item.przedmiot.cena",
      }),
      monety: new StringField({
        initial: "zloto",
        choices: monety,
        required: true,
      }),
      ilosc: new NumberField({
        initial: 1,
        label: "awanturnik20.item.przedmiot.ilosc",
      }),
    };
  }
}
