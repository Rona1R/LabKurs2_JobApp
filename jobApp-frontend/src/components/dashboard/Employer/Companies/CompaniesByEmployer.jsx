import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import theme from "../../tableTheme";
import { ThemeProvider } from "@mui/material";
import "../../styles/table.css";
import { useEffect } from "react";
import Loading from "src/components/common/Loading";
import { CompanyService } from "src/api/sevices/CompanyService";
import { useAuth } from "src/context/AuthContext";
const companyService = new CompanyService();

export default function CompaniesByEmployer() {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await companyService.getByEmployer(userId);
        console.log(response);
        setCompanies(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "description",
      headerName: "Description",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "logo",
      headerName: "Logo",
      width: 110,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
      renderCell: (params) => (
        <img
          src={`${import.meta.env.VITE_IMAGE_PATH}/${params.value}`}
          alt="Product"
          style={{
            height: "50px",
            width: "90px",
            marginBottom: "2px",
            objectFit: "contain",
          }}
        />
      ),
    },
    {
      field: "Employer",
      headerName: "Employer",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
      renderCell: (params) => {
        return (
          <>{`${params.row.employerName} ${params.row.employerLastName}`}</>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 290,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        const date = new Date(params.value + "Z");
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }); //.format(date);
        return <>{formattedDate}</>;
      },
    }
  ];

  const totalWidth = columns.reduce(
    (acc, column) => acc + (column.width || 0),
    0
  );

  return (
    <Box
      sx={{ width: "100%", overflowX: "auto", padding: "20px" }}
      className="table-container"
    >
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ width: totalWidth + 50, margin: "0 auto" }}>
          <ThemeProvider theme={theme}>
            <DataGrid
              rows={companies}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              getRowClassName={(params) => `super-app-theme--row`}
            />
          </ThemeProvider>
        </Box>
      )}
    </Box>
  );
}
