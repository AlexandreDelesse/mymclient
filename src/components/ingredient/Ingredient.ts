export default interface Ingredient {
  id: string;
  name: string;
  NutritionalInfo: NutritionalInformations;
}

export interface IngredientCmd {
  name: string;
  proteins: string;
  carbohydrates: string;
  lipids: string;
}

export interface NutritionalInformations {
  proteins: number;
  carbohydrates: number;
  lipids: number;
}
