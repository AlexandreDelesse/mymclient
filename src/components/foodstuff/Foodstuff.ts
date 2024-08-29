export default interface Foodstuff {
  id: number;
  name: string;
  nutritionals: Nutritionals;
}

export interface Nutritionals {
  protein: number;
  carb: number;
  fat: number;
}
