import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import theme from "../../tableTheme";
import { ThemeProvider } from "@mui/material";
import "../../styles/table.css";
import { useEffect } from "react";
import Loading from "components/common/Loading";
import { UserService } from "api/sevices/UserService";
const userService = new UserService();

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [refreshKey, setRefreshKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getAllWithRoles();
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [/*refreshKey*/]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "name",
      headerName: "Name",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "username",
      headerName: "Username",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
      renderCell: (params) => {
        return params.value? params.value : "Not Provided"
      },
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
      renderCell: (params) => {
        return Array.isArray(params.value)
          ? params.value.join(", ")
          : params.value;
      },
    },
    //     {
    //       field: "Actions",
    //       headerName: "Actions",
    //       width: 250,
    //       sortable: false,
    //       filterable: false,
    //       renderCell: (params) => (
    //         <>
    //           <Button
    //             onClick={() => handleEditClick(params.id)}
    //             className="edit-button"
    //           >
    //             <i className="fa-solid fa-pen-to-square"></i>
    //           </Button>

    //           <Button
    //             onClick={() => handleDeleteClick(params.id)}
    //             className="delete-button"
    //           >
    //             <i className="fa-solid fa-trash"></i>
    //           </Button>
    //         </>
    //       ),
    //       headerClassName: "super-app-theme--header",
    //       cellClassName: "super-app-theme--cell",
    //     },
  ];

  const totalWidth = columns.reduce(
    (acc, column) => acc + (column.width || 0),
    0
  );

  return (
    <>
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button className="create-button" onClick={() => setShowCreate(true)}>
          <FontAwesomeIcon icon={faPlus} className="create-icon" />
          Add Employer
        </Button>
      </Box> */}
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
                rows={users}
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
    </>
  );
}
