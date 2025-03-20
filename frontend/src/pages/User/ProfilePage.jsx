import React, { useState } from "react";
import { Button,Box } from "@mui/material";
import "./styles/ProfilePage.css";
import { useParams } from "react-router";
import { useEffect } from "react";
import { UserService } from "api/sevices/UserService";
import { FileService } from "api/sevices/FileService";
import Spinner from "react-bootstrap/Spinner";
import Loading from "components/common/Loading";
import { useNotification } from "hooks/useNotification";
import AboutMe from "components/user/About/AboutMe";
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
        showNotification("error",err.response.data);
      } else {
        showNotification("error","An Unexpected Error occurred while uploading Image!");
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
      showNotification("success","Background Image was successfully updated!");
      setImage(null);
    } catch (err) {
      showNotification("error","An Unexpected Error Occurred!");
    }
    setLoadingSubmit(false);
  };

  return (
    <>
      <div className="profile-page-background">
        {/* backgroud img temporarily static ! -> kena me majt ni foto tjt statike per userat qe skan qit foto nbackground*/}
        {/* shtimi i fotos nabckground kqyre qysh e ke bo te profili qe me tu bo render  niher e tani me ta qit nbutonin change background textin 'Save Changes' */}
        <div
          style={{
            backgroundImage: loading
              ? "none"
              : `url(${
                  image
                    ? image
                    : userProfile.profileBackground
                    ? `${process.env.REACT_APP_IMAGE_PATH}/${userProfile.profileBackground}`
                    : "/images/static-background-image2.jpg"
                })`,
          }}
          className="profile-background"
        >
          {loading && (
            <div className="tw-h-full tw-flex tw-justify-center tw-items-center">
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
          <div className="tw-px-5 tw-py-2 tw-flex tw-flex-col tw-gap-3 tw-pb-6">
            <div className="tw-relative tw-h-[300px] tw-w-[300px] tw-rounded-full tw-border-4 tw-border-white tw-overflow-hidden tw-shadow-md tw--mt-28">
              <img
                alt="profile-image"
                src={
                  userProfile.profilePic
                    ? `${process.env.REACT_APP_IMAGE_PATH}/${userProfile.profilePic}`
                    : "/images/placeholder-profile-pic.png"
                }
                className="tw-w-full tw-h-full tw-rounded-full tw-object-center tw-object-cover"
              />
            </div>
            <div className="background-button">
              {image ? (
                <>
                  <Button
                    onClick={() => setImage(null)}
                    className="cancel-background"
                  >
                    {" "}
                    Cancel
                  </Button>
                  <Button onClick={updateUser} className="save-background" disabled={loadingSubmit}>
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
              <h3 className="tw-text-l tw-text-slate-900 tw-relative tw-font-bold tw-leading-7">
                {userProfile.name} {userProfile.lastName}
              </h3>
              <h5 className="tw-text-l tw-text-gray-700 tw-relative tw-font-bold tw-leading-7">
                {userProfile.username}
              </h5>
              <p className="tw-text-xl tw-text-gray-600">{userProfile.email}</p>
            </div>

            <AboutMe
              editable={true}
              userData={userProfile}
              isLoading={loading}
              refresh={() => setRefreshKey(Date.now())}
              // text="A Dedicated Software Engineer with over 5 years of Experience , UI/UX Developer for different prominent companies around the world such as Facebook,Spotify and Netflix"
            />

          </div>
        </Box>
      </div>
    </>
  );
}
