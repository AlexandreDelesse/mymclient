import React, { useState } from "react";
import "./App.css";
import { Box, Container, Tab, Tabs } from "@mui/material";
import FoodStuffList from "./components/foodstuff/FoodStuffList";
import MealForm from "./components/meal/MealForm";

function App() {
  const tabs = ["foodstuff", "recipes", "meal"];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setActiveTab(newValue);

  return (
    <Container maxWidth="sm">
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        {tabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>

      {activeTab === 0 && <FoodStuffList />}
      {activeTab === 1 && (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          Feature still in developpment !
        </Box>
      )}
      {activeTab === 2 && <MealForm />}
    </Container>
  );
}

export default App;
