import Ingredient, { NutritionalInformations } from "../ingredient/Ingredient";

export default interface Meal {
  title: string;
  ingredients: Ingredient[];
  nutritionalInformations: NutritionalInformations;
}

export interface IngredientUsage {
  Ingredients: Ingredient | null;
  quantity: number;
}
