import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { IconButton, Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import "../../../styles/crud.css";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import AddRequirements from "./Requirements/AddRequirements";
import AddRequiredSkills from "./RequiredSkills/AddRequiredSkills";
import AddNiceToHaveSkill from "./NiceToHaveSkills/AddNiceToHaveSkill";
import { JobDetailsService } from "src/api/sevices/JobDetailsService";
import { useNotification } from "src/hooks/useNotification";
const jobDetailsService = new JobDetailsService();

export default function JobDetails({ jobId, handleClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    jobId: jobId,
    requirements: [],
    requiredSkills: [],
    niceToHaveSkills: [],
  });
  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedOptionalSkill, setSelectedOptionalSkill] = useState("");
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobDetailsService.getByJob(jobId);
        setJobDetails(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addRequirement = () => {
    if (selectedRequirement) {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        requirements: [...prevDetails.requirements, selectedRequirement],
      }));
    }
    setSelectedRequirement("");
  };

  const handleRequirementChange = (e) => {
    setSelectedRequirement(e.target.value);
  };

  const removeRequirement = (req) => {
    // remove nga lista
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      requirements: prevDetails.requirements.filter(
        (addedReq) => addedReq !== req
      ),
    }));
  };

  const addSkill = () => {
    if (selectedSkill) {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        requiredSkills: [...prevDetails.requiredSkills, selectedSkill],
      }));
    }
    setSelectedSkill("");
  };

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const removeSkill = (skill) => {
    // remove nga lista
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      requiredSkills: prevDetails.requiredSkills.filter(
        (addedSkill) => addedSkill !== skill
      ),
    }));
  };

  const addOptionalSkill = () => {
    if (selectedOptionalSkill) {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        niceToHaveSkills: [
          ...prevDetails.niceToHaveSkills,
          selectedOptionalSkill,
        ],
      }));
    }
    setSelectedOptionalSkill("");
  };

  const handleOptionalSkillChange = (e) => {
    setSelectedOptionalSkill(e.target.value);
  };

  const removeOptionalSkill = (optionalSkill) => {
    // remove nga lista
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      niceToHaveSkills: prevDetails.niceToHaveSkills.filter(
        (addedSkill) => addedSkill !== optionalSkill
      ),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await jobDetailsService.update(jobId, jobDetails);
      showNotification("success", "Job Details were successfully updated!");
      handleClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Update Job Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <>
              <Typography variant="h5" sx={{mb:3,textAlign:"center",fontWeight:"bold",color:"#1e1b46"}}> Requirements : </Typography>
              <AddRequirements
                addedRequirements={jobDetails.requirements}
                addRequirement={addRequirement}
                selectedRequirement={selectedRequirement}
                handleChange={handleRequirementChange}
                removeRequirement={removeRequirement}
              />
            </>
          )}

          {step === 2 && (
            <>
                           <Typography variant="h5" sx={{mb:3,textAlign:"center",fontWeight:"bold",color:"#1e1b46"}}> Required Skils : </Typography>
              <AddRequiredSkills
                addedSkills={jobDetails.requiredSkills}
                selectedSkill={selectedSkill}
                addSkill={addSkill}
                handleChange={handleSkillChange}
                removeSkill={removeSkill}
              />
            </>
          )}

          {step === 3 && (
            <>
              <Typography variant="h5" sx={{mb:3,textAlign:"center",fontWeight:"bold",color:"#1e1b46"}}> "Nice to have" Skills: </Typography>
              <AddNiceToHaveSkill
                addedOptionalSkills={jobDetails.niceToHaveSkills}
                selectedOptionalSkill={selectedOptionalSkill}
                addOptionalSkill={addOptionalSkill}
                handleChange={handleOptionalSkillChange}
                removeOptionalSkill={removeOptionalSkill}
              />
            </>
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
                Step {step} out 3
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
              <IconButton
                disabled={step === 3}
                onClick={() => setStep((prev) => prev + 1)}
              >
                <ArrowForward
                  sx={{
                    fontSize: "1.5em",
                    color: step === 3 ? "#ccc" : "#1e1b46",
                  }}
                />
              </IconButton>
            </div>
          </div>
        </Modal.Body>

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
              <>Save Changes</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
