import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: "primary.light",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          "& .MuiDataGrid-cell": {
            color: "#333333",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.2em",
          },
          "& .even-row": {
            backgroundColor: "#f7f7f7",
          },
          "& .MuiDataGrid-columnHeader": {
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            fontSize: "1.6em",
            color: "#0A0529",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#fafafa",
          },
          "& .MuiTablePagination-selectLabel":{
            marginBottom:"0px"
          },
          "& .MuiTablePagination-displayedRows":{
            marginBottom:"0px"
          },
          '& .MuiDataGrid-viewport': {
            overflowX: 'auto'
          },
        },
      },
    },
  },
});

export default theme;
