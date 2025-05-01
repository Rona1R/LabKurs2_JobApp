import { Button } from "@mui/material";

export default function CustomButton({ children, handleClick,color="hsl(218, 94.40%, 21.20%)",backgroundColor="#e8f0fe",hoverColor="hsl(218, 100.00%, 89.80%)"}) {
  return (
    <Button
      onClick={handleClick}
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        fontWeight: "bold",
        borderRadius: 4,
        textTransform: "none",
        "&:hover": {
          backgroundColor: hoverColor,
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
