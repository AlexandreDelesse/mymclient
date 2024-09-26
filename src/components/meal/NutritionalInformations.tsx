import React from "react";
import { IngredientUsage } from "./Meal";
import { Box, Typography } from "@mui/material";

interface nutritionalInformationsProps {
  ingredientUsage: IngredientUsage[];
}
export default function NutritionalInformations(
  props: nutritionalInformationsProps
) {
  const { ingredientUsage } = props;

  const totalProteins = ingredientUsage.reduce(
    (acc, current) =>
      acc +
      ((current.Ingredients?.NutritionalInfo.proteins || 0) *
        current.quantity) /
        100,
    0
  );
  const totalCarbohydrates = ingredientUsage.reduce(
    (acc, current) =>
      acc +
      ((current.Ingredients?.NutritionalInfo.carbohydrates || 0) *
        current.quantity) /
        100,
    0
  );
  const totallipids = ingredientUsage.reduce(
    (acc, current) =>
      acc +
      ((current.Ingredients?.NutritionalInfo.lipids || 0) * current.quantity) /
        100,
    0
  );
  const totalCalories =
    (totalCarbohydrates + totalProteins) * 4 + totallipids * 9;

  return (
    <Box sx={{ marginTop: 5 }}>
      <Typography variant="body1">Informations nutritionelles</Typography>
      <Box sx={{ padding: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="caption">proteinses</Typography>
            <Typography variant="body1" color="blue">
              {totalProteins.toFixed(1)} g
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">Lipides</Typography>
            <Typography variant="body1" color="blue">
              {totallipids.toFixed(1)} g
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">Glucides</Typography>
            <Typography variant="body1" color="blue">
              {totalCarbohydrates.toFixed(1)} g
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">Kcals</Typography>
            <Typography variant="body1" color="blue">
              {totalCalories.toFixed(0)} kcal
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
