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
import Loading from "../../../../components/common/Loading";
import { IconButton } from "@mui/material";
import { JobService } from "../../../../api/sevices/JobService";
import JobTags from "./JobTags/JobTags";
import CreatePosting from "./CreateJob/CreatePosting";
import UpdateJob from "./UpdateJob";
import DeleteJob from "./DeleteJob";
import JobDetails from "./JobDetails/JobDetails";
import { useAuth } from "src/context/AuthContext";
const jobService = new JobService();

export default function JobsTable() {
  const {user} = useAuth();
  const employerId = user?.nameid;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
  const [selected, setSelected] = useState(null);
  const [showTags, setShowTags] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleEditClick = (id) => {
    setSelected(id);
    setShowUpdate(true);
  };

  const handleDeleteClick = (id) => {
    setSelected(id);
    setShowDelete(true);
  };

  const handleShowTags = (id) => {
    setSelected(id);
    setShowTags(true);
  };

  const handleShowDetails = (id) => {
    setSelected(id);
    setShowDetails(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobService.getByEmployer(employerId);
        setJobs(response.data);
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
    {
      field: "title",
      headerName: "Title",
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
      field: "location",
      headerName: "Location",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "employmentType",
      headerName: "Employment Type",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "payRange",
      headerName: "Pay Range",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "salaryPeriod",
      headerName: "Salary Type",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell custom-cell",
    },
    {
      field: "company",
      headerName: "Company",
      width: 250,
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
        }); //.format(date);
        return <>{formattedDate}</>;
      },
    },
    {
      field: "deadline",
      headerName: "Deadline",
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
      field: "details",
      headerName: "Details",
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            className="details-button"
            onClick={() => handleShowDetails(params.id)}
          >
            <i className="fa-solid fa-circle-info"></i>
          </IconButton>
        </>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            className="details-button"
            onClick={() => handleShowTags(params.id)}
          >
            <i className="fa-solid fa-hashtag"></i>
          </IconButton>
        </>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
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
      {showTags && selected && (
        <JobTags id={selected} handleClose={() => setShowTags(false)} />
      )}

      {showDetails && selected && (
        <JobDetails
          jobId={selected}
          handleClose={() => setShowDetails(false)}
        />
      )}
      {showCreate && (
        <CreatePosting
          refresh={() => setRefreshKey(Date.now())}
          handleClose={() => setShowCreate(false)}
        />
      )}

      {showUpdate && selected && (
        <UpdateJob
          id={selected}
          refresh={() => setRefreshKey(Date.now())}
          handleClose={() => setShowUpdate(false)}
        />
      )}

      {showDelete && selected && (
        <DeleteJob
          id={selected}
          refresh={() => setRefreshKey(Date.now())}
          handleClose={() => setShowDelete(false)}
        />
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button className="create-button" onClick={() => setShowCreate(true)}>
          <FontAwesomeIcon icon={faPlus} className="create-icon" />
          Add Posting
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
                rows={jobs}
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
