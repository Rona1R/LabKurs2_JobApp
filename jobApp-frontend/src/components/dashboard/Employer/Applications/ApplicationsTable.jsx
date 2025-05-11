import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import theme from "../../tableTheme";
import { Stack, ThemeProvider, IconButton } from "@mui/material";
import "../../styles/table.css";
import { useEffect } from "react";
import Loading from "src/components/common/Loading";
import { useAuth } from "src/context/AuthContext";
import { JobApplicationService } from "src/api/sevices/JobApplicationService";
import DropdownFilter from "./filters/DropdownFilter";
import { CompanyService } from "src/api/sevices/CompanyService";
import { JobService } from "src/api/sevices/JobService";
import EditApplicationStatus from "./EditApplicationStatus";
const applicationService = new JobApplicationService();
const companyService = new CompanyService();
const jobService = new JobService();

export default function ApplicationsTable() {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [filters, setFilters] = useState({
    companyId: "",
    jobId: "",
  });
  const [refreshKey, setRefreshKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await applicationService.getApplicationsByEmployer(
          userId,
          filters
        );
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, refreshKey]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyResponse, jobResponse] = await Promise.all([
          companyService.getByEmployer(userId),
          jobService.getByEmployer(userId),
        ]);
        setCompanies(companyResponse.data);
        const formattedJobs = jobResponse.data.map((job) => ({
          id: job.id,
          name: job.title,
        }));
        setJobs(formattedJobs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (id) => {
    setSelected(id);
    setShowEdit(true);
  };

  const columns = [
    {
      field: "applicantName",
      headerName: "Applicant Name",
      width: 250,
      renderCell: (params) => {
        const { applicant } = params.row;
        return (
          <Link
            to={`/profile/${applicant?.id}`}
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            {applicant?.name} {applicant?.lastName}
          </Link>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => <span>{params.row?.applicant?.email}</span>,
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      width: 200,
      renderCell: (params) => <span>{params.row?.job?.title}</span>,
    },
    {
      field: "companyName",
      headerName: "Company",
      width: 200,
    },
    {
      field: "resumeUrl",
      headerName: "Resume",
      width: 300,
      renderCell: (params) => {
        const fileUrl = `${import.meta.env.VITE_FILE_PATH}/${
          params.row?.resumeUrl
        }`;
        const fileName =
          params.row?.resumeUrl?.split("_").slice(1).join("_") || "View Resume";
        return (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileName}
          </a>
        );
      },
    },
    {
      field: "applicationStatus",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const status = params.row?.applicationStatus;
        let icon = null;
        let color = "";
        switch (status) {
          case "Pending":
            icon = (
              <i
                className="fa-regular fa-clock"
                style={{ color: "#F57C00", marginRight: 8 }}
              />
            );
            color = "#F57C00";
            break;
          case "InReview":
            icon = (
              <i
                className="fa-solid fa-hourglass-half"
                style={{ color: "#1565c0", marginRight: 8 }}
              />
            );
            color = "#1565c0";
            break;
          case "Approved":
            icon = (
              <i
                className="fa-solid fa-circle-check"
                style={{ color: "#3c2ca6", marginRight: 8 }}
              />
            );
            color = "#3c2ca6";
            break;
          case "Withdrawn":
            icon = (
              <i
                className="fa-solid fa-arrow-rotate-left"
                style={{ color: "#757575", marginRight: 8 }}
              />
            );
            color = "#757575";
            break;
          default:
            icon = (
              <i
                className="fa-regular fa-question-circle"
                style={{ color: "#90A4AE", marginRight: 8 }}
              />
            );
            color = "#90A4AE";
        }
        return (
          <span
            style={{
              backgroundColor: `${color}22`,
              color,
              borderRadius: "16px",
              padding: "8px 12px",
            }}
          >
            {icon}
            {status}
          </span>
        );
      },
    },
    {
      field: "appliedAt",
      headerName: "Applied At",
      width: 250,
      renderCell: (params) => {
        const date = new Date(params.row?.appliedAt + "Z");
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
        <IconButton
          onClick={() => handleEditClick(params.id)}
          className="edit-button"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </IconButton>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  const totalWidth = columns.reduce(
    (acc, column) => acc + (column.width || 0),
    0
  );

  const handleFilters = (selected, key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: selected,
    }));
  };

  return (
    <>
      {showEdit && selected && (
        <EditApplicationStatus
          id={selected}
          handleClose={() => setShowEdit(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}
      {(applications.length > 0 || filters.companyId || filters.jobId) && (
        <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"center"}>
          <Box sx={{ width: "350px" }}>
            <DropdownFilter
              value={filters.companyId}
              setValue={(selected) => handleFilters(selected, "companyId")}
              label={"Select Company"}
              all={"All Companies"}
              options={companies}
            />
          </Box>
          <Box sx={{ width: "350px" }}>
            <DropdownFilter
              value={filters.jobId}
              setValue={(selected) => handleFilters(selected, "jobId")}
              label={"Select Job"}
              all={"All Jobs"}
              options={jobs}
            />
          </Box>
        </Stack>
      )}
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
                rows={applications}
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
