import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import theme from "../../tableTheme";
import { ThemeProvider } from "@mui/material";
import "../../styles/table.css";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { DepartamentService } from "../../../../api/sevices/DepartamentService";
import Loading from "../../../../components/common/Loading";
import {IconButton} from "@mui/material";
import CreateDepartament from "./CreateDepartament";
import UpdateDepartament from "./UpdateDepartament";
import DeleteDepartament from "./DeleteDepartament";
const departamentService = new DepartamentService();


export default function DepartamentsTable() {
  const [departaments, setDepartaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
  const [selected,setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate,setShowUpdate] = useState(false);
  const [showDelete,setShowDelete] = useState(false);

  const handleEditClick = (id) => {
    setSelected(id);
    setShowUpdate(true);
  };

  const handleDeleteClick = (id) => {
    setSelected(id);
    setShowDelete(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await departamentService.getAll();
        console.log(response);
        setDepartaments(response.data);
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
        field: "description",
        headerName: "Description",
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
        const date = new Date(params.value+"Z");
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
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 290,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        const date = new Date(params.value+"Z");
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
        <CreateDepartament
          handleClose={() => setShowCreate(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

       {
              showUpdate && selected && (
                <UpdateDepartament
                  id = {selected}
                  handleClose={() => setShowUpdate(false)}
                  refresh={() => setRefreshKey(Date.now())}
                />
              )
            }

          {
                showDelete && selected && (
                  <DeleteDepartament
                    id = {selected}
                    handleClose={() => setShowDelete(false)}
                    refresh={() => setRefreshKey(Date.now())}
                  />
                )
              }
      
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button className="create-button" onClick={() => setShowCreate(true)}>
          <FontAwesomeIcon icon={faPlus} className="create-icon" />
          Add Departament
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
                rows={departaments}
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
