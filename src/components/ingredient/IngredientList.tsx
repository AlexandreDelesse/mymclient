import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  deleteIngredient,
  getIngredients,
} from "../../services/ingredient.service";
import Ingredient from "./Ingredient";
import DeleteIcon from "@mui/icons-material/Delete";

export default function IngredientList({ filter }: { filter?: string }) {
  const [IngredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [itemIdHovered, setItemIdHovered] = useState<undefined | string>(
    undefined
  );
  const [loadingId, setLoadingId] = useState("");
  const isLoading = !!loadingId;

  const ingredientFiltered = filter
    ? IngredientList.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(filter.toLowerCase())
      )
    : IngredientList;

  const handleOnMouseEnter = (id: string) => setItemIdHovered(id);
  const handleOnMouseLeave = () => setItemIdHovered(undefined);

  const handleOnDelete = async (id: string) => {
    if (isLoading) return;
    try {
      setLoadingId(id);
      await deleteIngredient(id);
      setLoadingId("");
    } catch (error) {
      setLoadingId("");
      //TODO: Display error message
    }
  };

  useEffect(() => {
    if (isLoading) return;
    getIngredients()
      .then((data) => setIngredientList(data))
      .catch((data) => setIngredientList(data));
  }, [isLoading]);

  if (ingredientFiltered.length < 1)
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        Aucun ingredient à afficher
      </Box>
    );

  return (
    <Box sx={{ bgcolor: "whitesmoke", color: "steelblue" }}>
      <List>
        {ingredientFiltered.map((IngredientsEl) => (
          <ListItem
            onMouseEnter={() => handleOnMouseEnter(IngredientsEl.id)}
            onMouseLeave={handleOnMouseLeave}
            secondaryAction={
              (itemIdHovered === IngredientsEl.id ||
                (isLoading && loadingId === IngredientsEl.id)) && (
                <IconButton
                  edge="end"
                  onClick={() => handleOnDelete(IngredientsEl.id)}
                >
                  {isLoading && loadingId === IngredientsEl.id ? (
                    <CircularProgress color="error" size={16} />
                  ) : (
                    <DeleteIcon color="error" />
                  )}
                </IconButton>
              )
            }
            disablePadding
            key={IngredientsEl.id}
          >
            <ListItemButton>
              <ListItemText primary={IngredientsEl.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
