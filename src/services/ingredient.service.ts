import { IngredientCmd } from "../components/ingredient/Ingredient";
import Ingredients from "../components/ingredient/Ingredient";
import api from "./api";

const getIngredients = async (): Promise<Ingredients[]> => {
  try {
    const request = await api.get("/ingredients");
    return request.data;
  } catch (error) {
    return [];
  }
};

const createIngredient = async (ingredient: IngredientCmd) => {
  try {
    const request = await api.post("/ingredients", ingredient);
    return request.data;
  } catch (error) {
    throw error;
  }
};

const deleteIngredient = async (id: string) => {
  try {
    const request = await api.delete(`/ingredients/${id}`);
    return request.data;
  } catch (error) {
    throw error;
  }
};

export { getIngredients, createIngredient, deleteIngredient };
