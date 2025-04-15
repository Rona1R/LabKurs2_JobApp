import React from "react";
import { Box, Typography, Slider } from "@mui/material";

const PayRangeFilter = ({ value, onChange, min = 0, max = 10000 }) => {
  const formatCurrency = (val) => `€${val.toLocaleString()}`;

  return (
    <Box sx={{ width: 300, padding: 2,margin:"0 auto" }}>
      <Typography gutterBottom fontWeight="bold" sx={{color:"hsla(210, 82.50%, 84.30%, 0.85)",fontSize:"20px"}}>
        Pay Range
      </Typography>

      <Slider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={100}
        getAriaLabel={() => "Pay range"}
        valueLabelFormat={formatCurrency}
        sx={{
          color: "hsla(210, 82.50%, 84.30%, 0.85)",
        }}
      />

      <Typography variant="body2">
        {formatCurrency(value[0])} – {formatCurrency(value[1])}
      </Typography>
    </Box>
  );
};

export default PayRangeFilter;
