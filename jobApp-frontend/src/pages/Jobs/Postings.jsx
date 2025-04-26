import JobCard from "src/components/jobs/JobCard";
import Grid from "@mui/material/Grid2";
import JobHeader from "src/components/jobs/JobHeader";
import FilterSidebar from "src/components/jobs/FiltersSidebar/FilterSidebar";
import "./styles/Postings.css";
import { useEffect, useState, useCallback } from "react";
import { JobService } from "src/api/sevices/JobService";
import Loading from "src/components/common/Loading";
import { Box, Typography } from "@mui/material";
import NoDataYet from "src/components/common/NoDataYet";
import ResetButton from "src/components/jobs/ResetButton";
import CustomPagination from "src/components/jobs/CustomPagination";
import debounce from "lodash/debounce";
import { CompanyService } from "src/api/sevices/CompanyService";
import { CategoryService } from "src/api/sevices/CategoryService";
const jobService = new JobService();
const companyService = new CompanyService();
const categoryService = new CategoryService();

export default function Postings() {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [nrOfFilters, setNrOfFilters] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedJob, setSearchedJob] = useState("");
  const [refreshKey, setRefreshKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0); // State for max salary
  const [sidebarData, setSidebarData] = useState({
    companies: [],
    categories: [],
  });
  const [filters, setFilters] = useState({
    jobTypes: [],
    salaryTypes: [],
    datePosted: "",
    categoryId: "",
    companyId: "",
    country: "",
    city: "",
  });
  const [payRange, setPayRange] = useState([0, 0]);

  const fetchSidebarData = async () => {
    try {
      const [categories, companies, maxSalaryResponse] = await Promise.all([
        categoryService.getAll(),
        companyService.getAll(),
        jobService.getMaxSalary(),
      ]);
      setSidebarData((prev) => ({
        ...prev,
        categories: categories.data.map((category) => ({
          id: category.id,
          name: category.name,
        })),
        companies: companies.data.map((company) => ({
          id: company.id,
          name: company.name,
        })),
      }));
      setMaxSalary(maxSalaryResponse.data);
      setPayRange([0, maxSalaryResponse.data]);
    } catch (err) {
      console.error("Error fetching sidebar data:", err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        searchTerm: searchedJob,
        pageNumber: currentPage,
        pageSize: pageSize,
        minSalary: payRange[0],
        ...(payRange[1] !== 0 && { maxSalary: payRange[1] }), // Include maxSalary only if it's different from 0
      };
      const response = await jobService.getPostingsWithFilters(params); // Adjusted to pass params
      setPostings(response.data.items);
      setTotalPages(response.data.totalPages);
      setTotalRecords(response.data.totalRecords);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
    // console.log("Fetching job postings ....");
  }, [refreshKey, searchedJob, currentPage]);

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setShowFilters(false);
    setNrOfFilters(
      filters.jobTypes.length +
        filters.salaryTypes.length +
        (filters.datePosted !== "" ? 1 : 0) +
        (filters.categoryId !== "" ? 1 : 0) +
        (filters.companyId !== "" ? 1 : 0) +
        (filters.country !== "" ? 1 : 0) +
        (filters.city !== "" ? 1 : 0)+
        (payRange[0] !== 0 ? 1 : 0) +
        (payRange[1] !== 0 && payRange[1] !== maxSalary ? 1 : 0)
    );
    fetchData();
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      setCurrentPage(1);
      setSearchedJob(term);
    }, 500),
    []
  );

  const clearFilters = () => {
    setCurrentPage(1);
    setNrOfFilters(0);
    setFilters({
      jobTypes: [],
      salaryTypes: [],
      datePosted: "",
      categoryId: "",
      companyId: "",
      country: "",
      city: "",
    });
    setPayRange([0,maxSalary]);
    setSearchedJob("");
    setSearchTerm("");
    setShowFilters(false);
    setRefreshKey(Date.now());
  };

  const resetSearch = () => {
    setCurrentPage(1);
    setSearchedJob("");
    setSearchTerm("");
    setRefreshKey(Date.now());
  };

  return (
    <>
      <JobHeader
        showFilters={() => setShowFilters(true)}
        nrOfFilters={nrOfFilters}
        searchTerm={searchTerm}
        hasPostings = {nrOfFilters !== 0 || searchedJob.trim() !== "" || postings.length>0}
        setSearchTerm={setSearchTerm}
      />
      <FilterSidebar
        isOpen={showFilters}
        handleClose={() => setShowFilters(false)}
        filters={filters}
        payRange={payRange}
        setPayRange={setPayRange}
        setFilters={setFilters}
        companies={sidebarData.companies}
        categories={sidebarData.categories}
        maxSalary={maxSalary}
        handleApplyFilters={handleApplyFilters}
        clearFilters={clearFilters}
      />
      <div className="postings-container">
        {!loading && searchedJob.trim("") !== "" && postings.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ pb: 3, fontWeight: "bold" }}>
              Showing results for{" "}
              <span style={{ color: "#0A0529" }}>" {searchedJob} "</span>
            </Typography>
            <ResetButton resetSearch={resetSearch} />
          </Box>
        )}

        {loading ? (
          <Box sx={{ my: 30 }}>
            <Loading />
          </Box>
        ) : postings.length === 0 ? (
          <Box sx={{ my: 30 }}>
            <NoDataYet
              message={
                nrOfFilters === 0 && searchedJob.trim("") === ""
                  ? "No Postings, yet"
                  : nrOfFilters === 0 && searchedJob.trim("") !== ""
                  ? `No results found for "${searchedJob}"!`
                  : nrOfFilters !== 0 && searchedJob.trim("") === ""
                  ? "No Postings found. Try removing some filters!"
                  : `No results found for "${searchedJob}". Remove some filters and try again!`
              }
            />
            {searchedJob.trim("") !== "" && (
              <ResetButton resetSearch={resetSearch} />
            )}
          </Box>
        ) : (
          <Box sx={{ mx: { md: 5, lg: 15 } }}>
            <Grid container spacing={6} my={8} justifyContent={"center"}>
              {postings.map((posting, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <JobCard
                    id={posting.id}
                    title={posting.title}
                    city={posting.city}
                    timeLeft={posting.daysLeft}
                    companyLogo={posting.companyLogo}
                    category={posting.category}
                    employmentType={posting.employmentType}
                  />
                </Grid>
              ))}
            </Grid>
            {totalRecords > pageSize && (
              <CustomPagination
                total={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </Box>
        )}
      </div>
    </>
  );
}
