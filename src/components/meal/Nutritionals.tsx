import React from "react";
import { Ingredient } from "./Meal";
import { Box, Typography } from "@mui/material";

interface NutritionalsProps {
  ingredients: Ingredient[];
}
export default function Nutritionals(props: NutritionalsProps) {
  const { ingredients } = props;

  const totalProtein = ingredients.reduce(
    (acc, current) =>
      acc +
      ((current.foodstuff?.nutritionals.protein || 0) * current.quantity) / 100,
    0
  );
  const totalCarbs = ingredients.reduce(
    (acc, current) =>
      acc +
      ((current.foodstuff?.nutritionals.carb || 0) * current.quantity) / 100,
    0
  );
  const totalFats = ingredients.reduce(
    (acc, current) =>
      acc +
      ((current.foodstuff?.nutritionals.fat || 0) * current.quantity) / 100,
    0
  );
  const totalCalories = (totalCarbs + totalProtein) * 4 + totalFats * 9;
  console.log(totalProtein);

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="body1">Informations nutritionelles</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="caption">Proteines</Typography>
          <Typography variant="body1" color="blue">
            {totalProtein.toFixed(1)} g
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">Lipides</Typography>
          <Typography variant="body1" color="blue">
            {totalFats.toFixed(1)} g
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">Glucides</Typography>
          <Typography variant="body1" color="blue">
            {totalCarbs.toFixed(1)} g
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
  );
}
