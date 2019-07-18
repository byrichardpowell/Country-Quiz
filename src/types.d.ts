export interface ShortCountry {
  name: string;
  code: string;
}

export interface ShortCountries {
  countries: Array<ShortCountry>;
}

export interface FullCountry extends ShortCountry {}

export interface FullCountries {
  countries: Array<FullCountry>;
}

export interface QuizSetup {
  selectedCountries: Array<String>;
  selectedQuestions: Array<String>;
}
