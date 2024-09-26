import React, { useState } from "react";
import IngredientList from "./IngredientList";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import IngredientForm from "./IngredientForm";

export default function IngredientPage() {
  const [formOpen, setFormOpen] = useState(false);

  const toggleFormOpen = () => setFormOpen(!formOpen);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Button
        variant={formOpen ? "outlined" : "contained"}
        startIcon={formOpen ? <CloseIcon /> : <AddIcon />}
        onClick={toggleFormOpen}
        color={formOpen ? "warning" : "primary"}
      >
        {formOpen ? "Annuler" : "Ajouter"}
      </Button>

      <Box sx={{ marginTop: 3 }}>
        {formOpen && <IngredientForm onSave={toggleFormOpen} />}
        {!formOpen && <IngredientList />}
      </Box>
    </Box>
  );
}
