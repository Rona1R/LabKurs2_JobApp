import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../../styles/crud.css";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "src/hooks/useNotification";
import { CategoryService } from "src/api/sevices/CategoryService";
import { CompanyService } from "src/api/sevices/CompanyService";
import JobForm from "./JobForm";
import { kosovoCities } from "./kosovoCities";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import TagSelection from "./TagSelection";
import { TagService } from "src/api/sevices/TagService";
import { JobService } from "src/api/sevices/JobService";
import { JobTagService } from "src/api/sevices/JobTagService";
import AddRequirements from "../JobDetails/Requirements/AddRequirements";
import AddRequiredSkills from "../JobDetails/RequiredSkills/AddRequiredSkills";
import AddNiceToHaveSkill from "../JobDetails/NiceToHaveSkills/AddNiceToHaveSkill";
import { JobDetailsService } from "src/api/sevices/JobDetailsService";
import { useAuth } from "src/context/AuthContext";
const categoryService = new CategoryService();
const companyService = new CompanyService();
const tagService = new TagService();
const jobService = new JobService();
const jobTagService = new JobTagService();
const jobDetailsService = new JobDetailsService();

export default function CreatePosting(props) {
  const { user } = useAuth();
  const loggedInEmployer = user?.nameid;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [addedTags, setAddedTags] = useState([]);
  const [errors, setErrors] = useState({
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
  const [loading, setLoading] = useState(false);
  const { handleClose } = props;
  const { showNotification } = useNotification();

  const [selectedRequirement,setSelectedRequirement] = useState("");
  const [addedRequirements,setAddedRequirements] = useState([]);

  const [selectedSkill,setSelectedSkill] = useState("");
  const [addedSkills,setAddedSkills] = useState([]);

  const [selectedOptionalSkill,setSelectedOptionalSkill] = useState("");
  const [addedOptionalSkills,setAddedOptionalSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyResponse, categoryResponse, tagsResponse] = await Promise.all([
          companyService.getByEmployer(loggedInEmployer),
          categoryService.getAll(),
          tagService.getAll()
        ]);
  
        setCompanies(companyResponse.data);
        setCategories(categoryResponse.data);
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

  const addRequirement = () => {
    setAddedRequirements([...addedRequirements,selectedRequirement]);
    setSelectedRequirement("");
  }

  const handleRequirement2Change = (e) => {
     setSelectedRequirement(e.target.value);
  };

  const removeRequirement = (req) => { // remove nga lista
    setAddedRequirements(addedRequirements.filter(addedReq=>addedReq !== req));
  }

  const addSkill = () => {
    setAddedSkills([...addedSkills,selectedSkill]);
    setSelectedSkill("");
  }

  const handleSkillChange = (e) => {
     setSelectedSkill(e.target.value);
  };

  const removeSkill = (skill) => { // remove nga lista
    setAddedSkills(addedSkills.filter(addedSkill=> addedSkill !== skill));
  }

  const addOptionalSkill = () => {
    setAddedOptionalSkills([...addedOptionalSkills,selectedOptionalSkill]);
    setSelectedOptionalSkill("");
  }

  const handleOptionalSkillChange = (e) => {
     setSelectedOptionalSkill(e.target.value);
  };

  const removeOptionalSkill = (optionalSkill) => { // remove nga lista
    setAddedOptionalSkills(addedOptionalSkills.filter(addedOptionalSkill=> addedOptionalSkill !== optionalSkill));
  }

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

  const insertJobDetails = async (jobId) => {
    const jobDetailsRequest = {
      jobId : jobId,
      requirements : addedRequirements,
      requiredSkills : addedSkills,
      niceToHaveSkills :addedOptionalSkills
    }
    await jobDetailsService.create(jobDetailsRequest);
  }

  const handleSubmit = async () => {
    setLoading(true);

    const formattedDeadline = new Date(formData.deadline).toISOString();
    const data = { ...formData, deadline: formattedDeadline };

    const job = await createJob(data);
    if (job) {
      await insertJobDetails(job.data.id);

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
          {
            step === 3 && (
              <AddRequirements
                addedRequirements={addedRequirements}
                addRequirement={addRequirement}
                selectedRequirement={selectedRequirement}
                handleChange={handleRequirement2Change}
                removeRequirement={removeRequirement}
              />
            )
          }
          {
            step === 4 && (
              <AddRequiredSkills
                addedSkills = {addedSkills}
                selectedSkill = {selectedSkill}
                addSkill={addSkill}
                handleChange={handleSkillChange}
                removeSkill={removeSkill}
              />
            )
          }
          {
            step === 5 && (
              <AddNiceToHaveSkill 
                addedOptionalSkills={addedOptionalSkills}
                selectedOptionalSkill={selectedOptionalSkill}
                addOptionalSkill={addOptionalSkill}
                handleChange={handleOptionalSkillChange}
                removeOptionalSkill={removeOptionalSkill}
              />
            )
          }
          {step === 6 && (
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
                Step {step} out 6
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
              <IconButton disabled={step === 6} onClick={incrementStep}>
                <ArrowForward
                  sx={{
                    fontSize: "1.5em",
                    color: step === 6 ? "#ccc" : "#1e1b46",
                  }}
                />
              </IconButton>
            </div>
          </div>
        </Modal.Body>
        {step === 6 && (
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
