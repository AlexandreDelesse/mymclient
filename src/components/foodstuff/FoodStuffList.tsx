import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Foodstuff from "./Foodstuff";
import { getFoodstuff } from "../../services/foodstuff.service";

export default function FoodStuffList() {
  const [foodStuffList, setFoodStuffList] = useState<Foodstuff[]>([]);

  useEffect(() => {
    getFoodstuff()
      .then((data) => setFoodStuffList(data))
      .catch((data) => setFoodStuffList(data));
  }, []);

  if (foodStuffList.length < 1)
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>No foodstuff yet</Box>
    );

  return (
    <Box sx={{ bgcolor: "whitesmoke", color: "steelblue", marginTop: 4 }}>
      <List>
        {foodStuffList.map((foodstuffEl) => (
          <ListItem disablePadding key={foodstuffEl.id}>
            <ListItemButton>
              <ListItemText primary={foodstuffEl.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
