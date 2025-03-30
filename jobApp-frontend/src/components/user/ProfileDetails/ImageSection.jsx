import Loading from "src/components/common/Loading";
import { Button } from "@mui/material";
import { useState } from "react";
import { FileService } from "src/api/sevices/FileService";
import { UserService } from "src/api/sevices/UserService";
import { Spinner } from "react-bootstrap";
import "./styles/ImageSection.css";
import { useNotification } from "src/hooks/useNotification";
const fileService = new FileService();
const userService = new UserService();

export default function ImageSection({ userProfile, userId, loading,setRefreshKey }) {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { showNotification } = useNotification();

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
      if (userProfile.backgroundImage) {
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
      await userService.update(userId, data);
      setRefreshKey(Date.now());
      showNotification("success", "Background Image was successfully updated!");
      setImage(null);
    } catch (err) {
      console.log(err);
      showNotification("error", "An Unexpected Error Occurred!");
    }
    setLoadingSubmit(false);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: loading
            ? "none"
            : `url(${
                image
                  ? image
                  : userProfile. profileBackground
                  ? `${import.meta.env.VITE_IMAGE_PATH}/${
                      userProfile. profileBackground
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
      <div className="background-button">
        {image ? (
          <>
            <Button
              onClick={() => setImage(null)}
              className="cancel-background"
              sx={{fontSize:{xs:"15px",sm:"20px"},textTransform:"none",padding:{sm:"8px 15px"},mr:1}}
            >
              Cancel
            </Button>
            <Button
              onClick={updateUser}
              className="save-background"
              disabled={loadingSubmit}
              sx={{fontSize:{xs:"15px",sm:"20px"},textTransform:"none",padding:{sm:"8px 15px"}}}
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
              <Button component="span" className="change-background" sx={{fontSize:{xs:"15px",sm:"20px"},padding:{sm:"10px 40px"}}}>
                Change Background
              </Button>
            </label>
          </>
        )}
      </div>
    </>
  );
}
