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

export default function IngredientList() {
  const [IngredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [itemIdHovered, setItemIdHovered] = useState<undefined | string>(
    undefined
  );
  const [loadingId, setLoadingId] = useState("");
  const isLoading = !!loadingId;

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
    console.log("effect triggered");
    if (isLoading) return;
    getIngredients()
      .then((data) => setIngredientList(data))
      .catch((data) => setIngredientList(data));
  }, [isLoading]);

  if (IngredientList.length < 1)
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>Aucun ingredient dans la liste</Box>
    );

  return (
    <Box sx={{ bgcolor: "whitesmoke", color: "steelblue" }}>
      <List>
        {IngredientList.map((IngredientsEl) => (
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
