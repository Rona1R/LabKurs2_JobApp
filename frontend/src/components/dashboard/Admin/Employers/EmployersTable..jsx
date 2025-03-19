import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import theme from "../../tableTheme";
import { ThemeProvider, IconButton } from "@mui/material";
import "../../styles/table.css";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Loading from "components/common/Loading";
import { EmployeeService } from "api/sevices/EmployerService";
import CreateEmployer from "./CreateEmployer";
import UpdateEmployer from "./UpdateEmployer";
import DeleteEmployer from "./DeleteEmployer";
const employerService = new EmployeeService();

export default function EmployersTable() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleEditClick = (id) => {
    setSelected(id);
    setShowUpdate(true);
  };

  const handleDeleteClick = (id) => {
    setSelected(id);
    setShowDelete(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employerService.getAll();
        setEmployers(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 90,
    //   headerClassName: "super-app-theme--header",
    //   cellClassName: "super-app-theme--cell custom-cell",
    // },
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
      field: "email",
      headerName: "Email",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "departament",
      headerName: "Departament",
      width: 350,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
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
        });
        return <>{formattedDate}</>;
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEditClick(params.id)}
            className="edit-button"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </IconButton>

          <IconButton
            onClick={() => handleDeleteClick(params.id)}
            className="delete-button"
          >
            <i className="fa-solid fa-trash"></i>
          </IconButton>
        </>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  const totalWidth = columns.reduce(
    (acc, column) => acc + (column.width || 0),
    0
  );

  return (
    <>
      {showCreate && (
        <CreateEmployer
          refresh={() => setRefreshKey(Date.now())}
          handleClose={() => setShowCreate(false)}
        />
      )}
      {showUpdate && selected && (
        <UpdateEmployer
          id={selected}
          handleClose={() => setShowUpdate(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      {showDelete && selected && (
        <DeleteEmployer
          id={selected}
          handleClose={() => setShowDelete(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button className="create-button" onClick={() => setShowCreate(true)}>
          <FontAwesomeIcon icon={faPlus} className="create-icon" />
          Add Employer
        </Button>
      </Box>
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
                rows={employers}
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
