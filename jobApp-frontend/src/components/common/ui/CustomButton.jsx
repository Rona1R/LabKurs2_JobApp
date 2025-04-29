import { Button } from "@mui/material";

export default function CustomButton({ children, handleClick }) {
  return (
    <Button
      onClick={handleClick}
      sx={{
        backgroundColor: "#e8f0fe",
        color: "hsl(218, 94.40%, 21.20%)",
        fontWeight: "bold",
        borderRadius: 4,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "hsl(218, 100.00%, 89.80%)",
        },
        fontSize: "20px",
        px: 4,
        py: 1,
      }}
    >
      {children}
    </Button>
  );
}
