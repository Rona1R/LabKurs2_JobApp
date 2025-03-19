import { Button } from "@mui/material";

export default function ResetButton({resetSearch}) {
  return (
    <Button
      onClick={resetSearch}
      variant="outlined" 
      sx={{
        color: "#0A0529", 
        borderColor: "#0A0529", 
        backgroundColor: "inherit", 
        "&:hover": {
          backgroundColor: "#0A0529", 
          color: "white", 
          borderColor: "#0A0529", 
        },
        fontWeight: "bold", 
        textTransform: "none", 
        boxShadow: "none", 
        padding: "8px 16px", 
        borderRadius: "4px", 
        fontSize:"20px"
      }}
    >
      Reset Search
    </Button>
  );
}
