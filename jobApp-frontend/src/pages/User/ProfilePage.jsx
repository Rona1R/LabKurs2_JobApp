import React, { useState } from "react";
import { Button, Divider, Box } from "@mui/material";
import "./styles/ProfilePage.css";
import { useParams } from "react-router";
import { useEffect } from "react";
import { UserService } from "../../api/sevices/UserService";
import { FileService } from "../../api/sevices/FileService";
import Spinner from "react-bootstrap/Spinner";
import Loading from "../../components/common/Loading";
import { useNotification } from "../../hooks/useNotification";
import AboutMe from "../../components/user/About/AboutMe";
import Education from "../../components/user/Education/Education";
import Languages from "../../components/user/Languages/Languages";
import Experience from "../../components/user/WorkExperience/Experience";
import Skills from "src/components/user/Skills/Skills";
import DetailsSection from "src/components/user/ProfileDetails/DetailsSection";
const userService = new UserService();
const fileService = new FileService();

export default function ProfilePage() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [refreshKey, setRefreshKey] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    lastName: "",
    username: "",
    profileBackground: "",
    profilePic: "",
    email: "",
    phoneNumber: "",
    aboutMe: "",
  });
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getById(id);
        setUserProfile(response.data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchData();
  }, [id, refreshKey]);

  const handleUpload = (event) => {
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

  const uploadImage = async (fileData) => {
    try {
      if (userProfile.profileBackground) {
        await fileService.delete(userProfile.profileBackground, "image");
      }
      const image = await fileService.create(fileData, "image");
      return image.data.fileUrl;
    } catch (err) {
      if (err.response && err.response.status === 400) {
        showNotification("error", err.response.data);
      } else {
        showNotification(
          "error",
          "An Unexpected Error occurred while uploading Image!"
        );
        console.log("An Unexpected Error while uploading image");
        console.log(err);
      }
      return null;
    }
  };

  const updateUser = async () => {
    setLoadingSubmit(true);
    const fileData = new FormData();
    fileData.append("file", imageFile);
    const newBackground = await uploadImage(fileData);
    if (!newBackground) {
      setLoadingSubmit(false);
      return;
    }
    const data = {
      ...userProfile,
      profileBackground: newBackground,
    };
    try {
      await userService.update(id, data);
      setRefreshKey(Date.now());
      showNotification("success", "Background Image was successfully updated!");
      setImage(null);
    } catch (err) {
      showNotification("error", "An Unexpected Error Occurred!");
    }
    setLoadingSubmit(false);
  };

  return (
    <div className="profile-page-background">
      <div
        style={{
          backgroundImage: loading
            ? "none"
            : `url(${
                image
                  ? image
                  : userProfile.profileBackground
                  ? `${import.meta.env.VITE_IMAGE_PATH}/${
                      userProfile.profileBackground
                    }`
                  : "/images/static-background-image2.jpg"
              })`,
        }}
        className="profile-background"
      >
        {loading && (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <Loading />
          </div>
        )}
      </div>
      <Box
        sx={{
          backgroundColor: "white",
          ml: { lg: 20 },
          mr: { lg: 20 },
          boxShadow: "0px 4px 6px rgba(107, 107, 107, 0.1)",
        }}
      >
        <div className="px-5 py-2 d-flex flex-column gap-3 pb-6">
          <div
            className="position-relative rounded-circle border border-4 border-white overflow-hidden shadow-md"
            style={{ width: "350px", height: "350px", marginTop: "-100px" }}
          >
            <img
              alt="profile-image"
              src={
                userProfile.profilePic
                  ? `${import.meta.env.VITE_IMAGE_PATH}/${
                      userProfile.profilePic
                    }`
                  : "/images/placeholder-profile-pic.png"
              }
              className="w-100 h-100 rounded-circle object-cover"
            />
          </div>
          <DetailsSection/>
          <div className="background-button">
            {image ? (
              <>
                <Button
                  onClick={() => setImage(null)}
                  className="cancel-background"
                >
                  Cancel
                </Button>
                <Button
                  onClick={updateUser}
                  className="save-background"
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
                      Uploading ...
                    </>
                  ) : (
                    <>Save Changes</>
                  )}
                </Button>
              </>
            ) : (
              <>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-button-file"
                  type="file"
                  onChange={handleUpload}
                />
                <label htmlFor="upload-button-file">
                  <Button component="span" className="change-background">
                    Change Background
                  </Button>
                </label>
              </>
            )}
          </div>
          <div>
            <h3 className="h3 text-dark fw-bold mb-3">
              {userProfile.name} {userProfile.lastName}
            </h3>
            <h5 className="h5 text-muted fw-bold mb-3">
              {userProfile.username}
            </h5>
            <p className="lead text-muted">{userProfile.email}</p>
          </div>
          <Skills userId={id} />

          <AboutMe
            editable={true}
            userData={userProfile}
            isLoading={loading}
            refresh={() => setRefreshKey(Date.now())}
          />

          <Divider sx={{ backgroundColor: "gray" }} />

          <Experience userId={id} />

          <Divider sx={{ backgroundColor: "gray" }} />

          <Education userId={id} />

          <Divider sx={{ backgroundColor: "gray" }} />

          <Languages userId={id} />
        </div>
      </Box>
    </div>
  );
}
