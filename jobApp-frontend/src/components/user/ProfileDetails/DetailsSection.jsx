import { Box, Button,styled } from "@mui/material";

const StyledButton = styled(Button)({
    color: 'rgba(60, 44, 241, 0.98)',
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '10px 40px',
    marginBottom:'20px',
    borderRadius: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
    textTransform: 'none', 
    transition: 'transform 0.1s ease-in-out', 
    '&:hover': {
      transform: 'scale(1.05)', 
      backgroundColor:"white",
      boxShadow: '0 6px 12px rgba(125, 124, 124, 0.3)', 
    }
});

export default function DetailsSection() {
  return (
    <Box sx={{display:"flex",justifyContent:"center",gap:2}}>
      <StyledButton>Open To</StyledButton>
      <StyledButton>Enhance Profile</StyledButton>
    </Box>
  );
}
