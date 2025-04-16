import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { Container, Box } from "@mui/material";

export default function CustomPagination({
  total,
  currentPage,
  setCurrentPage,
}) {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ mt: 9,mb:5 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={total}
          page={currentPage}
          onChange={handleChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#0A0529",
              fontWeight: "bold",
              fontSize:"22px",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              color: "black",
              backgroundColor: "hsl(210, 97.10%, 86.70%)",
            }
          }}
        />
      </Box>
    </Container>
  );
}
