import Foodstuff from "../components/foodstuff/Foodstuff";
import api from "./api";

const getFoodstuff = async (): Promise<Foodstuff[]> => {
  try {
    const request = await api.get("/foodstuff");
    return request.data;
  } catch (error) {
    return [];
  }
};

export { getFoodstuff };
