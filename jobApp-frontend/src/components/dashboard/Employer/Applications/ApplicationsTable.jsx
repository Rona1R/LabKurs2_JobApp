import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import theme from "../../tableTheme";
import { ThemeProvider } from "@mui/material";
import "../../styles/table.css";
import { useEffect } from "react";
import Loading from "src/components/common/Loading";
import { useAuth } from "src/context/AuthContext";
import { JobApplicationService } from "src/api/sevices/JobApplicationService";
const applicationService = new JobApplicationService();

export default function ApplicationsTable() {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await applicationService.getApplicationsByEmployer(
          userId
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
  }, []);
  const columns = [
    {
      field: "applicantName",
      headerName: "Applicant Name",
      width: 250,
      renderCell: (params) => (
        <span>
          {params.row?.applicant?.name} {params.row?.applicant?.lastName}
        </span>
      ),
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
      const fileUrl = `${import.meta.env.VITE_FILE_PATH}/${params.row?.resumeUrl}`;
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
      width: 150,
      renderCell: (params) => {
        const statusMap = {
          0: "Pending",
          1: "Accepted",
          2: "Rejected",
        };
        return (
          <span>{statusMap[params.row?.applicationStatus] || "Unknown"}</span>
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
  );
}
