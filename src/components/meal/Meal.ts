import Foodstuff, { Nutritionals } from "../foodstuff/Foodstuff";

export default interface Meal {
  title: string;
  ingredients: Ingredient[];
  nutritionals: Nutritionals;
}

export interface Ingredient {
  foodstuff: Foodstuff | null;
  quantity: number;
}
