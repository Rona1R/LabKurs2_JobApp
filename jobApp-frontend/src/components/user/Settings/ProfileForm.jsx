import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { useState } from "react";
import formTheme from "../../../components/dashboard/styles/formTheme";
import { Spinner } from "react-bootstrap";
import { UserService } from "../../../api/sevices/UserService";
import Loading from "../../../components/common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCheckCircle,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  updateEmail,
  updateUser,
  updateUsername,
  updateUserPicture,
} from "./ProfileFormActions/ProfileServices";
import "./styles/ProfileForm.css";
import { validateEmail } from "../../common/utils/validationUtils";
import { useNotification } from "../../../hooks/useNotification";
const userService = new UserService();

function ProfileForm() {
  const [image, setImage] = useState(null);
  const [loggedInUser] = useState(2);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [editMode, setEditMode] = useState("");
  const [refreshKey, setRefreshKey] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    profilePic: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getById(loggedInUser);
        setFormData(response.data);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [refreshKey, loggedInUser]);

  const handleCancelEdit = () => {
    setEditMode("");
    setNameError("");
    setLastNameError("");
    setUsernameError("");
    setEmailError("");
    setImage(null);
    setImageFile(null);
    setRefreshKey(Date.now());
  };

  const validate = () => {
    if (formData.name.trim() === "") {
      setNameError("Name can not be empty!");
      return false;
    }

    if (formData.lastName.trim() === "") {
      setLastNameError("Last Name can not be empty!");
      return false;
    }

    if (formData.username.trim() === "") {
      setUsernameError("Username can not be empty!");
      return false;
    }

    if (formData.email.trim() === "") {
      setEmailError("Email can not be empty!");
      return false;
    }

    if (!validateEmail(formData.email)) {
      setEmailError("Email is not valid!");
      return false;
    }
    return true;
  };

  const handleSaveChanges = async () => {
    if (validate()) {
      if (editMode === "profilePic") {
        await updateUserPicture(
          formData,
          loggedInUser,
          showNotification,
          setLoadingSubmit,
          setImage,
          setRefreshKey,
          imageFile
        );
        setImageFile(null);
        setEditMode("");
      }else if(editMode === "name"){
        await updateUser(
          formData,
          loggedInUser,
          showNotification,
          setLoadingSubmit,
          setRefreshKey,
        );
        setEditMode("");
      } 
      else if (editMode === "username") {
        await updateUsername(
          loggedInUser,
          formData.username,
          showNotification,
          setLoadingSubmit,
          setUsernameError,
          setEditMode,
          setRefreshKey
        );
      }else if(editMode === "email"){
        await updateEmail(
          loggedInUser,
          formData.email,
          showNotification,
          setLoadingSubmit,
          setEmailError,
          setEditMode,
          setRefreshKey
        );
      }
    }
  };

  const handleEditMode = (mode) => {
    setEditMode(mode);
  };

  const handleUpload = (event) => {
    setEditMode("profilePic");
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <>
      <Box sx={{ pb: 2 }}>
        <ProfilePictureUpload
          image={
            image
              ? image
              : formData.profilePic
              ? `${import.meta.env.VITE_IMAGE_PATH}/${formData.profilePic}`
              : null
          }
          handleUpload={handleUpload}
          user={formData}
          userId={loggedInUser}
          showRemove={
            formData.profilePic !== "" && image === null && editMode === ""
          }
          disabledButton={editMode !== ""}
          refresh={() => setRefreshKey(Date.now())}
        />
      </Box>
      <Box component="form" sx={{ "& .MuiTextField-root": { width: "100%" } }}>
        {loading ? (
          <div style={{ margin: "100px 0px" }}>
            <Loading />
          </div>
        ) : (
          <ThemeProvider theme={formTheme}>
            <Grid container columnSpacing={1} rowSpacing={6}>
              <Grid size={5.5}>
                <TextField
                  required
                  disabled={editMode !== "name"}
                  name="name"
                  label="First Name"
                  variant="outlined"
                  error={!!nameError}
                  helperText={nameError}
                  value={formData.name}
                  onChange={(e) => {
                    setNameError("");
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid size={5.5}>
                <TextField
                  required
                  disabled={editMode !== "name"}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  error={!!lastnameError}
                  helperText={lastnameError}
                  value={formData.lastName}
                  onChange={(e) => {
                    setLastNameError("");
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid size={1}>
                <IconButton
                  className={`profile-edit-button ${
                    editMode !== "" ? "disabled-edit" : ""
                  }`}
                  sx={{
                    height: "55px",
                    padding: "0px 15px",
                    marginLeft: "0px",
                  }}
                  disabled={editMode !== ""}
                  onClick={() => handleEditMode("name")}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
              </Grid>
              <Grid size={11}>
                <TextField
                  required
                  disabled={editMode !== "username"}
                  name="username"
                  label="Username"
                  variant="outlined"
                  error={!!usernameError}
                  helperText={usernameError}
                  value={formData.username}
                  onChange={(e) => {
                    setUsernameError("");
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid size={1}>
                <IconButton
                  className={`profile-edit-button ${
                    editMode !== "" ? "disabled-edit" : ""
                  }`}
                  sx={{
                    height: "55px",
                    padding: "0px 15px",
                    marginLeft: "0px",
                  }}
                  disabled={editMode !== ""}
                  onClick={() => handleEditMode("username")}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
              </Grid>
              <Grid size={11}>
                <TextField
                  required
                  disabled={editMode !== "email"}
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  error={!!emailError}
                  helperText={emailError}
                  value={formData.email}
                  onChange={(e) => {
                    setEmailError("");
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid size={1}>
                <IconButton
                  className={`profile-edit-button ${
                    editMode !== "" ? "disabled-edit" : ""
                  }`}
                  sx={{
                    height: "55px",
                    padding: "0px 15px",
                    marginLeft: "0px",
                  }}
                  disabled={editMode !== ""}
                  onClick={() => handleEditMode("email")}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
              </Grid>
            </Grid>
          </ThemeProvider>
        )}
        {editMode !== "" && (
          <Grid container spacing={2} mt={3}>
            <Grid size={6}>
              <Button
                className="cancel-button"
                fullWidth
                sx={{
                  mt: 2,
                  color: "white",
                  fontSize: "1.3em",
                  padding: "10px 0",
                  textTransform: "none",
                  height: "55px",
                }}
                onClick={handleCancelEdit}
              >
                Cancel
                <FontAwesomeIcon
                  icon={faCancel}
                  style={{ marginLeft: "10px" }}
                />
              </Button>
            </Grid>
            <Grid size={6}>
              <Button
                className="save-changes-button"
                fullWidth
                sx={{
                  mt: 2,
                  color: "white",
                  fontSize: "1.3em",
                  padding: "10px 0",
                  textTransform: "none",
                  height: "55px",
                }}
                onClick={handleSaveChanges}
                disabled={loadingSubmit}
              >
                {loadingSubmit ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: "10px" }}
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    Save
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ marginLeft: "10px" }}
                    />
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default ProfileForm;
