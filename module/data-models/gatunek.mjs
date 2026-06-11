import { monety, atrybuty, kompetencje } from "../config.mjs";

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

export class gatunekDataModel extends foundry.abstract.TypeDataModel {
  static metadata = Object.freeze({});

  static defineSchema() {
    return {
      modyfikator_cech: new ArrayField(
        new SchemaField({
          cecha_do_obnizenia: new ArrayField(
            new StringField({
              initial: "sila",
              choices: atrybuty,
              required: true,
              label:
                "awanturnik20.item.gatunek.modyfikator_cech.cecha_obnizenie",
            }),
          ),
          cecha_do_zwiekszenia: new ArrayField(
            new StringField({
              initial: "sila",
              choices: atrybuty,
              required: true,
              label:
                "awanturnik20.item.gatunek.modyfikator_cech.cecha_zwiekszenie",
            }),
          ),
          wartosc: new NumberField({
            initial: 0,
            label: "awanturnik20.item.gatunek.modyfikator_cech.wartosc",
          }),
        }),
      ),
      pt: new SchemaField({
        rodzaj: new StringField({
          initial: "d4",
          label: "awanturnik20.item.gatunek.pt.rodzaj",
          choices: {
            d4: "awanturnik20.item.bron.pt.d4",
            d6: "awanturnik20.item.bron.pt.d6",
            d8: "awanturnik20.item.bron.pt.d8",
            d10: "awanturnik20.item.bron.pt.d10",
            d12: "awanturnik20.item.bron.pt.d12",
            d20: "awanturnik20.item.bron.pt.d20",
          },
          required: true,
        }),
        modyfikator: new NumberField({
          initial: 0,
          label: "awanturnik20.item.gatunek.pt.modyfikator",
        }),
        wartosc_na_lvl: new ArrayField(
          new NumberField({
            initial: 0,
          }),
        ),
      }),
      opis: new HTMLField({
        label: "awanturnik20.item.opis",
      }),
      archetyp_fabularny: new HTMLField({
        label: "awanturnik20.item.gatunek.archetyp_fabularny",
      }),
      lore_etrii: new HTMLField({
        label: "awanturnik20.item.gatunek.lore_Etrii",
      }),
      kompetencje_do_wyboru: new ArrayField(
        new SchemaField({
          kompetencje: new ArrayField(
            new StringField({
              initial: "dowolna",
              choices: {
                ...kompetencje,
                dowolna: "awanturnik20.item.gatunek.kompetencje.dowolna",
              },
              required: true,
            }),
          ),
          ilosc_kompetencji: new NumberField({
            initial: 0,
            label: "awanturnik20.item.gatunek.ilosc_kompetencji",
          }),
        }),
      ),
      os_wartosci: new SchemaField({
        cnoty: new NumberField({
          initial: 0,
          label: "awanturnik20.item.gatunek.os_wartosci.conoty",
        }),
        zalety: new NumberField({
          initial: 0,
          label: "awanturnik20.item.gatunek.os_wartosci.zalety",
        }),
        wady: new NumberField({
          initial: 0,
          label: "awanturnik20.item.gatunek.os_wartosci.wady",
        }),
        przywary: new NumberField({
          initial: 0,
          label: "awanturnik20.item.gatunek.os_wartosci.przywary",
        }),
      }),
      jezyk: new StringField({
        initial: "",
        label: "awanturnik20.item.gatunek.jezyk",
      }),
    };
  }
  prepareDerivedData() {
    super.prepareDerivedData();
    this.praparePtNaLvl();
    this.prepareIloscKompetencji();
  }

  prepareIloscKompetencji() {
    for (const group of this.kompetencje_do_wyboru ?? []) {
      if (group.ilosc_kompetencji > group.kompetencje?.length) {
        group.ilosc_kompetencji = group.kompetencje?.length ?? 0;
      }
    }
  }
  praparePtNaLvl() {
    const ptNaLvl = this.pt;
    const lvl1 = Number(ptNaLvl.rodzaj.split("d")[1]) + ptNaLvl.modyfikator;
    ptNaLvl.wartosc_na_lvl[0] = lvl1;
  }
}
