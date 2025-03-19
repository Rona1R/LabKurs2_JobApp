import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../../styles/crud.css";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "hooks/useNotification";
import { CategoryService } from "api/sevices/CategoryService";
import { CompanyService } from "api/sevices/CompanyService";
import JobForm from "./JobForm";
import { kosovoCities } from "./kosovoCities";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import TagSelection from "./TagSelection";
import { TagService } from "api/sevices/TagService";
import { JobService } from "api/sevices/JobService";
import { JobTagService } from "api/sevices/JobTagService";
import AddRequirements from "../Requirements/AddRequirements";
import { RequirementService } from "api/sevices/RequirementService";
const categoryService = new CategoryService();
const companyService = new CompanyService();
const tagService = new TagService();
const jobService = new JobService();
const jobTagService = new JobTagService();
const requirementService = new RequirementService();

export default function CreatePosting(props) {
  const loggedInEmployer = 1; // PER SIMULIM !!
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    country: { value: "", label: "" },
    city: "",
    employmentType: "",
    minimalSalary: 0,
    maximalSalary: 0,
    deadline: null,
    salaryPeriod: "",
    currency: "",
    companyId: null,
    categoryId: null,
  });
  const [selectedCompany, setSelectedCompany] = React.useState(null);
  const [companies, setCompanies] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [cities, setCities] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState(null);
  const [addedTags, setAddedTags] = React.useState([]);
  const [errors, setErrors] = React.useState({
    company: "",
    category: "",
    title: "",
    description: "",
    country: "",
    city: "",
    employmentType: "",
    minimalSalary: "",
    maximalSalary: "",
    deadline: "",
    salaryPeriod: "",
    currency: "",
  });
  const [loading, setLoading] = React.useState(false);
  const { handleClose } = props;
  const { showNotification } = useNotification();
  const [requirementToAdd, setRequirementToAdd] = React.useState({
    description: "",
    jobId: null,
  }); 
  const [addedRequirements, setAddedRequirements] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // me i fetch vetem kompanit e Employer qe eshte logged in ! (se veq per to ka tdrejt me postu shpallje ...)
        const response = await companyService.getByUser(loggedInEmployer);
        setCompanies(response.data);

        const categoryResponse = await categoryService.getAll();
        setCategories(categoryResponse.data);

        const tagsResponse = await tagService.getAll();
        setTags(tagsResponse.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [handleClose]);

  const handleCompanyChange = (event, newValue) => {
    if (newValue) {
      setSelectedCompany(newValue);
      setFormData({ ...formData, companyId: newValue.id });
      setErrors({ ...errors, company: "" });
    }
  };

  const handleCategoryChange = (event, newValue) => {
    if (newValue) {
      setSelectedCategory(newValue);
      setFormData({ ...formData, categoryId: newValue.id });
      setErrors({ ...errors, category: "" });
    }
  };

  const handleCountryChange = (event, newValue) => {
    if (newValue) {
      console.log("You picked a country!");
      setSelectedCountry(newValue);
      setSelectedCity("");
      setFormData({ ...formData, country: newValue, city: "" });
      setErrors({ ...errors, country: "" });

      if (newValue.label !== "Kosova") {
        fetchCitiesForCountry(newValue.value);
      }

      if (newValue.label === "Kosova") {
        setCities(kosovoCities);
      }
    }
  };
  const handleCityChange = (event, newValue) => {
    if (newValue) {
      setSelectedCity(newValue);
      setFormData({ ...formData, city: newValue /*.name */ });
      setErrors({ ...errors, city: "" });
    }
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, deadline: newDate });
    setErrors({ ...errors, deadline: "" });
  };
  const handleTagChange = (event, newValue) => {
    setSelectedTag(newValue);
  };

  const handleAddTag = () => {
    if (selectedTag) {
      setAddedTags([...addedTags, selectedTag]);
      setSelectedTag(null);
    }
  };

  const handleRemoveTag = (tagId) => {
    setAddedTags(addedTags.filter((t) => t.id !== tagId));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRequirement = () => {
    setAddedRequirements([...addedRequirements, requirementToAdd]);
    setRequirementToAdd({ ...requirementToAdd, description: "" });
  };

  const handleRemoveRequirement = (description) => {
    setAddedRequirements(
      addedRequirements.filter((req) => req.description !== description)
    );
  };

  const handleRequirementChange = (e) => {
    setRequirementToAdd({ ...requirementToAdd, description: e.target.value });
  };

  const fetchCitiesForCountry = async (countryCode) => {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "UWhGbnVFMlFmR3ZVeWZSQW1KcUNwVEY5aWVQMGEyeGJDSGNsYUNuVw==",
        },
      }
    );
    const data = await response.json();
    const uniqueCities = data.reduce(
      (acc, city) => {
        if (!acc.seen.has(city.name)) {
          acc.seen.add(city.name);
          acc.result.push(city.name);
          // acc.result.push({ /*id: city.id, */name: city.name });
        }
        return acc;
      },
      { seen: new Set(), result: [] }
    ).result;

    setCities(uniqueCities);
  };

  const validate = () => {
    if (step === 1) {
      if (formData.title.trim() === "") {
        setErrors({ ...errors, title: "Title can not be empty!" });
        return false;
      }
      if (formData.description.trim() === "") {
        setErrors({ ...errors, description: "Description can not be empty!" });
        return false;
      }
      if (!selectedCountry) {
        setErrors({ ...errors, country: "Country can not be empty!" });
        return false;
      }
      if (formData.city.trim() === "") {
        setErrors({ ...errors, city: "City can not be empty!" });
        return false;
      }
      if (formData.employmentType.trim() === "") {
        setErrors({
          ...errors,
          employmentType: "Employment Type must be selected!",
        });
        return false;
      }
    }
    if (step === 2) {
      if (isNaN(formData.minimalSalary) || formData.minimalSalary === "") {
        setErrors({ ...errors, minimalSalary: "Minimal Salary is invalid!" });
        return false;
      }
      if (isNaN(formData.maximalSalary) || formData.maximalSalary === "") {
        setErrors({ ...errors, maximalSalary: "Maximal Salary is invalid!" });
        return false;
      }
      if (formData.currency.trim() === "") {
        setErrors({ ...errors, currency: "Currency must be selected!" });
        return false;
      }
      if (formData.salaryPeriod.trim() === "") {
        setErrors({ ...errors, salaryPeriod: "Salary Type must be selected!" });
        return false;
      }
      if (!formData.companyId) {
        setErrors({ ...errors, company: "Company must be selected!" });
        return false;
      }
      if (!formData.categoryId) {
        setErrors({ ...errors, category: "Category must be selected!" });
        return false;
      }
      if (formData.deadline === null) {
        // validate mos me qene data ne te kaluaren !
        setErrors({ ...errors, deadline: "Deadline must be selected!" });
        return false;
      }
    }

    return true;
  };

  const incrementStep = () => {
    const isValid = validate();
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const createJob = async (data) => {
    try {
      const response = await jobService.create(data);
      return response;
    } catch (err) {
      console.log(err);
      showNotification("error", "An Unexpected Error Occurred!");
      handleClose();
    }
    return null;
  };

  const insertTags = async (jobId) => {
    const formattedTags = addedTags.map((tag) => ({
      jobId: jobId,
      tagId: tag.id,
    }));
    try {
      await jobTagService.addJobTags(formattedTags);
    } catch (err) {
      console.log(err);
      showNotification("error", "An Unexpected Error Occurred while adding tags!");
      handleClose();
    }
  };

  const insertRequirements = async (jobId) => {
    const formattedRequirements = addedRequirements.map((req) => ({
      ...req,
      jobId : jobId
    }));
    try {
      await requirementService.createRequirements(formattedRequirements);
    } catch (err) {
      console.log(err);
      showNotification("error", "An Unexpected Error Occurred while adding requirements!");
      handleClose();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formattedDeadline = new Date(formData.deadline).toISOString();
    const data = { ...formData, deadline: formattedDeadline };

    const job = await createJob(data);
    if (job) {
      if(addedRequirements.length > 0){
        await insertRequirements(job.data.id);
      }

      if(addedTags.length > 0) {
        await insertTags(job.data.id);
      }
      
      setLoading(false);
      props.refresh();
      showNotification("success", "Job was successfully created!");
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={true}
        onHide={props.handleClose}
        centered
        className="crud-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title> Create Job Posting </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step < 3 && (
            <JobForm
              formData={formData}
              errors={errors}
              setErrors={setErrors}
              handleChange={handleChange}
              selectedCountry={selectedCountry}
              handleCountryChange={handleCountryChange}
              cities={cities}
              selectedCity={selectedCity}
              handleCityChange={handleCityChange}
              companies={companies}
              selectedCompany={selectedCompany}
              handleCompanyChange={handleCompanyChange}
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
              handleDateChange={handleDateChange}
              step={step}
            />
          )}

          {step === 3 && (
            <AddRequirements
              selectedRequirement={requirementToAdd}
              handleChange={handleRequirementChange}
              addedRequirements={addedRequirements}
              addRequirement={handleAddRequirement}
              removeRequirement={handleRemoveRequirement}
            />
          )}

          {step === 4 && (
            <TagSelection
              tags={tags}
              selectedTag={selectedTag}
              handleTagChange={handleTagChange}
              addedTags={addedTags}
              addTag={handleAddTag}
              removeTag={handleRemoveTag}
            />
          )}

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Typography
                variant="body1"
                sx={{
                  color: "#666666",
                  fontWeight: "bold",
                  paddingLeft: "4px",
                }}
              >
                Step {step} out 4
              </Typography>
            </div>
            <div>
              <IconButton
                disabled={step === 1}
                onClick={() => setStep((prev) => prev - 1)}
              >
                <ArrowBack
                  sx={{
                    fontSize: "1.5em",
                    color: step === 1 ? "#ccc" : "#1e1b46",
                  }}
                />
              </IconButton>
              <IconButton disabled={step === 4} onClick={incrementStep}>
                <ArrowForward
                  sx={{
                    fontSize: "1.5em",
                    color: step === 4 ? "#ccc" : "#1e1b46",
                  }}
                />
              </IconButton>
            </div>
          </div>
        </Modal.Body>
        {step === 4 && (
          <Modal.Footer>
            <Button
              onClick={handleSubmit}
              className="crud-submit"
              disabled={loading}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <>Submit</>
              )}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
