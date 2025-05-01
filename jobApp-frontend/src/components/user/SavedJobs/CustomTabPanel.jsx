import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import customTabPanelTheme from "./styles/CustomTabPanelTheme";
import { ThemeProvider } from "@mui/material";

export default function CustomTabPanel({activeTab,setActiveTab}) {
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={customTabPanelTheme}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab
          label="Saved Posts"
          value="Saved Posts" 
          sx={{ fontSize: { xs: "1em", md: "1.5em" }, px: { xs: 2, md: 6 } }}
        />
        <Tab
          label="Collections"
          value="Collections"
          sx={{ fontSize: { xs: "1em", md: "1.5em" }, px: { xs: 2, md: 6 } }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
