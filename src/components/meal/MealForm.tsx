import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, EventHandler, useEffect, useState } from "react";
import { Ingredient } from "./Meal";
import Foodstuff from "../foodstuff/Foodstuff";
import { getFoodstuff } from "../../services/foodstuff.service";
import Nutritionals from "./Nutritionals";

export default function MealForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const emptyIngredient = {
    foodstuff: null,
    quantity: 0,
  };

  const handleOnTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleOnUpdateIngredient = (index: number, ingredient: Ingredient) =>
    setIngredients((old) =>
      old.map((ingre, i) => (i === index ? ingredient : ingre))
    );

  const addEmptyIngredient = () =>
    setIngredients((old) => [...old, emptyIngredient]);

  const isIngredientEmpty = (ingredient: Ingredient) =>
    !ingredient.foodstuff || !ingredient.quantity;

  const hasEmptyIngredient = ingredients.some((ingredient) =>
    isIngredientEmpty(ingredient)
  );

  return (
    <Container>
      <TextField
        sx={{ marginTop: 4 }}
        onChange={handleOnTitleChange}
        label="Titre du repas"
        size="small"
        fullWidth
        value={title}
      />

      {ingredients.map((ingredient, index) => (
        <IngredientForm
          key={index}
          onUpdateIngredient={handleOnUpdateIngredient}
          ingredientIndex={index}
        />
      ))}

      <Button
        disabled={hasEmptyIngredient}
        variant="text"
        onClick={addEmptyIngredient}
      >
        Ajouter un ingredient
      </Button>

      <Nutritionals ingredients={ingredients} />
    </Container>
  );
}

interface IngredientFormProps {
  ingredientIndex: number;
  onUpdateIngredient: (index: number, ingredient: Ingredient) => void;
}
const IngredientForm = (props: IngredientFormProps) => {
  const { onUpdateIngredient, ingredientIndex } = props;

  const [foodstuffs, setFoodstuffs] = useState<Foodstuff[]>([]);
  const [foodstuffIdSelected, setFoodstuffSelected] = useState("-1"); // -1 is correspond to "Ingredient" in list which means the default value
  const [quantity, setQuantity] = useState(0);

  const foodStuffSelected =
    foodstuffs.find(
      (foodstuff) => foodstuff.id === parseInt(foodstuffIdSelected)
    ) || null;

  const handleOnSelectFoodstuff = (e: SelectChangeEvent<string>) =>
    setFoodstuffSelected(e.target.value);

  const handleOnQuantityChanges = (e: ChangeEvent<HTMLInputElement>) =>
    setQuantity(parseInt(e.target.value));

  useEffect(() => {
    getFoodstuff().then((data) => setFoodstuffs(data));
  }, []);

  useEffect(() => {
    onUpdateIngredient(ingredientIndex, {
      foodstuff: foodStuffSelected,
      quantity,
    });
  }, [foodStuffSelected, quantity, ingredientIndex]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
      <FormControl fullWidth>
        <Select
          size="small"
          value={foodStuffSelected?.id.toString() || "-1"}
          onChange={handleOnSelectFoodstuff}
        >
          <MenuItem value="-1">Ingredient</MenuItem>
          {foodstuffs.map((foodstuff) => (
            <MenuItem value={foodstuff.id} key={foodstuff.id}>
              {foodstuff.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        value={quantity}
        size="small"
        onChange={handleOnQuantityChanges}
      />
    </Box>
  );
};
