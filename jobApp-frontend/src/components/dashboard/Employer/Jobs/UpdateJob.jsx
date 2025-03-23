import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import { CategoryService } from "../../../../api/sevices/CategoryService";
import { CompanyService } from "../../../../api/sevices/CompanyService";
import { JobService } from "../../../../api/sevices/JobService";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "../../../../hooks/useNotification";
import JobForm from "./CreateJob/JobForm";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { kosovoCities } from "./CreateJob/kosovoCities";
import dayjs from 'dayjs';
const companyService = new CompanyService();
const categoryService = new CategoryService();
const jobService = new JobService();

export default function UpdateJob(props) {
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

  React.useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await jobService.getById(props.id);
          const data = {...response.data,deadline: dayjs(response.data.deadline+"Z")};
          setFormData(data);
          setSelectedCountry(data.country); 
          setSelectedCity(data.city);

          if(data.country.label === "Kosova"){
            setCities(kosovoCities);
          }else{
            fetchCitiesForCountry(data.country.value);
          }

          const categoryResponse = await categoryService.getById(data.categoryId);
          setSelectedCategory(categoryResponse.data);

          const companyResponse = await companyService.getById(data.companyId);
          setSelectedCompany(companyResponse.data); 
        } catch (err) {
          console.log(err);
          handleClose();
        }
      };
  
      fetchData();
    }, [props.id, handleClose]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // me i fetch vetem kompanit e Employer qe eshte logged in ! (se veq per to ka tdrejt me postu shpallje ...)
        const response = await companyService.getByUser(loggedInEmployer);
        setCompanies(response.data);

        const categoryResponse = await categoryService.getAll();
        setCategories(categoryResponse.data);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async () => {
    const isValid = validate(); 
    if(isValid){
      setLoading(true);

      const formattedDeadline = new Date(formData.deadline).toISOString();
      const data = { ...formData, deadline: formattedDeadline };
      try {
        await jobService.update(props.id,data);
        props.refresh();
        showNotification("success", "Job was successfully updated!");
        handleClose();
      } catch (err) {
        console.log(err);
        showNotification("error", "An Unexpected Error Occurred!");
        handleClose();
      }
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
          <Modal.Title> Update Job </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                Step {step} out 2
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
              <IconButton disabled={step === 2} onClick={incrementStep}>
                <ArrowForward
                  sx={{
                    fontSize: "1.5em",
                    color: step === 2 ? "#ccc" : "#1e1b46",
                  }}
                />
              </IconButton>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {step === 2 && (
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
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
