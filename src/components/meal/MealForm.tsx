import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { IngredientUsage } from "./Meal";
import Ingredients from "../ingredient/Ingredient";
import { getIngredients } from "../../services/ingredient.service";
import RemoveIcon from "@mui/icons-material/Remove";
import NutritionalInformations from "./NutritionalInformations";

export default function MealForm() {
  const [title, setTitle] = useState("");
  const [ingredientUsages, setIngredientUsages] = useState<IngredientUsage[]>(
    []
  );

  const emptyIngredient = {
    Ingredients: null,
    quantity: 0,
  };

  const handleOnTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleOnUpdateIngredient = (
    index: number,
    ingredient: IngredientUsage
  ) =>
    setIngredientUsages((old) =>
      old.map((ingre, i) => (i === index ? ingredient : ingre))
    );

  const handleOnRemoveIngredient = (index: number) =>
    setIngredientUsages((old) => old.filter((ingredient, i) => i !== index));

  const addEmptyIngredient = () =>
    setIngredientUsages((old) => [...old, emptyIngredient]);

  const isIngredientEmpty = (ingredient: IngredientUsage) =>
    !ingredient.Ingredients || !ingredient.quantity;

  const hasEmptyIngredient = ingredientUsages.some((ingredientUsage) =>
    isIngredientEmpty(ingredientUsage)
  );

  const save = () => console.log({ title, ingredientUsages });

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

      <Typography sx={{ marginTop: 5 }} variant="body1">
        Ingredients
      </Typography>

      {ingredientUsages.map((ingredient, index) => (
        <IngredientForm
          key={index}
          onUpdateIngredient={handleOnUpdateIngredient}
          ingredientIndex={index}
          onRemoveIngredient={handleOnRemoveIngredient}
        />
      ))}

      <Button
        sx={{ marginTop: 1 }}
        disabled={hasEmptyIngredient}
        variant="text"
        onClick={addEmptyIngredient}
      >
        Ajouter un ingredient
      </Button>

      <NutritionalInformations ingredientUsage={ingredientUsages} />

      <Button
        disabled={hasEmptyIngredient}
        sx={{ marginTop: 4 }}
        variant="contained"
        color="primary"
        onClick={save}
      >
        Sauvegarder le repas
      </Button>
    </Container>
  );
}

interface IngredientFormProps {
  ingredientIndex: number;
  onUpdateIngredient: (index: number, ingredient: IngredientUsage) => void;
  onRemoveIngredient: (index: number) => void;
}
const IngredientForm = (props: IngredientFormProps) => {
  const { onUpdateIngredient, onRemoveIngredient, ingredientIndex } = props;

  const [Ingredientss, setIngredientss] = useState<Ingredients[]>([]);
  const [IngredientsIdSelected, setIngredientsSelected] = useState("-1"); // -1 is correspond to "Ingredient" in list which means the default value
  const [quantity, setQuantity] = useState(0);

  const IngredientsSelected =
    Ingredientss.find(
      (Ingredients) => Ingredients.id === IngredientsIdSelected
    ) || null;

  const handleOnSelectIngredients = (e: SelectChangeEvent<string>) =>
    setIngredientsSelected(e.target.value);

  const handleOnQuantityChanges = (e: ChangeEvent<HTMLInputElement>) =>
    setQuantity(parseInt(e.target.value));

  useEffect(() => {
    getIngredients().then((data) => setIngredientss(data));
  }, []);

  useEffect(() => {
    onUpdateIngredient(ingredientIndex, {
      Ingredients: IngredientsSelected,
      quantity,
    });
  }, [IngredientsSelected, quantity, ingredientIndex]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
      <FormControl fullWidth>
        <Select
          size="small"
          value={IngredientsSelected?.id.toString() || "-1"}
          onChange={handleOnSelectIngredients}
        >
          <MenuItem value="-1">Ingredient</MenuItem>
          {Ingredientss.map((Ingredients) => (
            <MenuItem value={Ingredients.id} key={Ingredients.id}>
              {Ingredients.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        value={quantity}
        size="small"
        onChange={handleOnQuantityChanges}
        InputProps={{
          endAdornment: <InputAdornment position="end">g</InputAdornment>,
        }}
      />

      <IconButton onClick={() => onRemoveIngredient(ingredientIndex)}>
        <RemoveIcon color="error" />
      </IconButton>
    </Box>
  );
};
