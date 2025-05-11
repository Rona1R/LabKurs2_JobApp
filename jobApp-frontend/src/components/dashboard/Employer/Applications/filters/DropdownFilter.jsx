import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dropdownFilterTheme from "./dropdownFilterTheme";
import { ThemeProvider } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DropdownFilter({ value, setValue, label, all, options,isDisabled = false }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ mx: 2, my: 3 }}>
      <ThemeProvider theme={dropdownFilterTheme}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" shrink disabled={isDisabled}>{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            MenuProps={MenuProps}
            onChange={handleChange}
            disabled={isDisabled}
            displayEmpty
          >
            <MenuItem value="">
              <em>{all}</em>
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </Box>
  );
}
