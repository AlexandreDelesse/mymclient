import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { createIngredient } from "../../services/ingredient.service";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export default function IngredientForm({ onSave }: { onSave?: () => any }) {
  const [name, setName] = useState("");
  const [lipids, setLipids] = useState("");
  const [proteins, setProteins] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChanges = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleProteinsChanges = (e: ChangeEvent<HTMLInputElement>) =>
    setProteins(e.target.value);

  const handleLipidsChanges = (e: ChangeEvent<HTMLInputElement>) =>
    setLipids(e.target.value);

  const handleCarbohydratesChanges = (e: ChangeEvent<HTMLInputElement>) =>
    setCarbohydrates(e.target.value);

  const handleSave = async () => {
    const ingredient = {
      name,
      lipids,
      carbohydrates,
      proteins,
    };
    try {
      setIsLoading(true);
      await createIngredient(ingredient);
      setIsLoading(false);
      if (onSave) onSave();
    } catch (error) {
      setIsLoading(false);
      //TODO: Display error message
    }
  };

  return (
    <Box>
      <TextField
        size="small"
        onChange={handleNameChanges}
        value={name}
        label="Nom"
        fullWidth
      />
      <Typography sx={{ my: 2 }}>Informations nutritionelles</Typography>
      <Stack direction="row" gap={2}>
        <TextField
          size="small"
          label="Proteines"
          onChange={handleProteinsChanges}
          value={proteins}
        />
        <TextField
          size="small"
          label="Lipides"
          onChange={handleLipidsChanges}
          value={lipids}
        />
        <TextField
          size="small"
          label="Glucides"
          onChange={handleCarbohydratesChanges}
          value={carbohydrates}
        />
      </Stack>
      <Button
        sx={{ marginTop: 3 }}
        variant="contained"
        color="success"
        onClick={handleSave}
        startIcon={
          isLoading ? (
            <CircularProgress size={16} sx={{ color: "white" }} />
          ) : (
            <ThumbUpAltIcon />
          )
        }
      >
        Valider
      </Button>
    </Box>
  );
}
