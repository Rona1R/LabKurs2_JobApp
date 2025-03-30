import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../../dashboard/styles/crud.css";;
import OpenToOption from "./OpenToOption";
import { UserProfileService } from "src/api/sevices/UserProfileService";
import { Spinner } from "react-bootstrap";
import { useNotification } from "src/hooks/useNotification";
const userProfileService = new UserProfileService();

export default function OpenToModal({handleClose,profileDetails,refresh}) {
  console.log(profileDetails);
  const [profile,setProfile] = useState(profileDetails);
  const [loading,setLoading] = useState(false);
  const { showNotification } = useNotification();

  const saveChanges = (option,description) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      openTo: {
        ...prevProfile.openTo,  
        [option]: description  
      }
    }));
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await userProfileService.update(profileDetails.userId, profile);
      showNotification("success", "Your profile was successfully updated!");
      handleClose();
      refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        centered
        className="crud-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title> Select Option </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <OpenToOption option="Open to work" optionLabel="openToWork" defaultDescription="Show us what roles you are seeking" optionDescription = {profile.openTo.openToWork} saveChanges={saveChanges}/>
        <OpenToOption option="Business Opportunities" optionLabel="businessOpportunities" defaultDescription="Tell us more about what kind of opportunities your're interested in" optionDescription = {profile.openTo.businessOpportunities}  saveChanges={saveChanges}/>
        <OpenToOption option="Providing Services" optionLabel="providingServices" defaultDescription="Showcase services that you offer" selectedOptions={profile.openTo.selectedOptions} optionDescription = {profile.openTo.providingServices}  saveChanges={saveChanges} />
        <OpenToOption option="Networking" optionLabel="networking" defaultDescription="Describe what areas you are interested in expanding your network" selectedOptions={profile.openTo.selectedOptions} optionDescription = {profile.openTo.networking} saveChanges={saveChanges}/>
        </Modal.Body>
        <Modal.Footer>
          <Button className="crud-submit" disabled={loading} onClick={handleSubmit}>
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
              <>
                Save changes
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
