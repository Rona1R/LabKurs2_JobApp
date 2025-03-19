import {
  List,
  ListItemButton,
  ListItem,
  Collapse,
  ListItemText,
  FormControlLabel,
  Checkbox,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const theme = createTheme({
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "hsla(210, 31.10%, 76.10%, 0.85)",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "gray",
          "&.Mui-checked": {
            color: "hsla(210, 82.50%, 84.30%, 0.85)",
          },
          "&:hover": {
            backgroundColor: "rgba(184, 226, 255, 0.08)",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "hsl(210, 100.00%, 86.10%)",
        },
      },
    },
  },
});

export default function CheckboxMenu({
  label,
  options,
  selected,
  setSelected,
  isRadioButton = false,
}) {
  const [open, setIsOpen] = useState(false);

  const handleChange = (event) => {
    if (isRadioButton) {
      setSelected(event.target.name);
    } else {
      const optionValue = event.target.value;
      if (event.target.checked) {
        setSelected([...selected, optionValue]);
      } else {
        setSelected(selected.filter((item) => item !== optionValue));
      }
    }
  };

  const handleClick = () => {
    setIsOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <List component="nav">
        <ListItemButton
          onClick={handleClick}
          sx={{ pl: 4, py: 2, mx: 2, bgcolor: "#151034" }}
        >
          <ListItemText primary={label} />
          {open ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              style={{ color: "hsl(210, 100.00%, 86.10%)", fontSize: "2rem" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "hsl(210, 100.00%, 86.10%)", fontSize: "2rem" }}
            />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            sx={{ pt: 0, pl: 4, mx: 2, bgcolor: "#151034" }}
          >
            {isRadioButton
              ? options.map((option, index) => (
                  <ListItem key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selected === option}
                          onChange={handleChange}
                          name={option}
                        />
                      } label={option}
                    />
                  </ListItem>
                ))
              : options.map((option, index) => (
                  <ListItem key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                        checked={selected.includes(option)}
                        value={option} 
                        onChange={handleChange} />
                      }
                      label={option}
                    />
                  </ListItem>
                ))}
          </List>
        </Collapse>
      </List>
    </ThemeProvider>
  );
}
