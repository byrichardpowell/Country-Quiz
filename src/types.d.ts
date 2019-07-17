export interface ShortCountry {
  name: string;
  code: string;
}

export interface ShortCountries {
  countries: Array<ShortCountry>;
}

export interface FullCountry extends ShortCountry {}

export interface FullCountries extends FullCountry {
  countries: Array<FullCountry>;
}
