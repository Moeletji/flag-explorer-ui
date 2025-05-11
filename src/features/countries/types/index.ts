export interface Country {
  name: string;
  flag: string;
}

export interface CountryDetails extends Country {
  population: number;
  capital: string;
}