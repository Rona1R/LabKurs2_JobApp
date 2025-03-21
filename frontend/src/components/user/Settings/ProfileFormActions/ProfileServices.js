import { UserService } from "api/sevices/UserService";
import { FileService } from "api/sevices/FileService";

const userService = new UserService();
const fileService = new FileService();


const uploadImage = async (oldProfilePic,fileData,showNotification) => { 

  try {
    if (oldProfilePic) {
      await fileService.delete(oldProfilePic, "image");
    }
    const image = await fileService.create(fileData, "image");
    return image.data.fileUrl;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      showNotification("error",err.response.data);
    } else {
      showNotification("error","An Unexpected Error occurred while uploading Image!");
      console.log("An Unexpected Error while uploading image", err);
    }
    return null;
  }
};

const handleUpdate = async (userId, data, showNotification) => { 
  try {
    await userService.update(userId, data);
    showNotification("success","Your Information was successfully updated!");
  } catch (err) {
    showNotification("error","An Unexpected Error Occurred!");
  }
};

export const updateUserPicture = async ( 
  formData,
  loggedInUser,
  showNotification,
  setLoadingSubmit,
  setImage,
  setRefreshKey,
  imageFile
) => {
  setLoadingSubmit(true);
  const fileData = new FormData();
  if (imageFile) {
    fileData.append("file", imageFile);
    const newProfilePic = await uploadImage(formData.profilePic,fileData, showNotification);
    if (!newProfilePic) {
      return;
    }
    setImage(null);
    const user = {
      ...formData,
      profilePic: newProfilePic,
    };

    await handleUpdate(loggedInUser, user, showNotification);
    setRefreshKey(Date.now());
  }
  setLoadingSubmit(false);
};



export const updateUser = async ( formData, 
  loggedInUser,
  showNotification,
  setLoadingSubmit,
  setRefreshKey) => { 
    setLoadingSubmit(true);
    await handleUpdate(loggedInUser,formData,showNotification);
    setRefreshKey(Date.now());
    setLoadingSubmit(false);
}
  
export const updateUsername = async ( 
  userId,
  username,
  showNotification,
  setLoadingSubmit,
  setUsernameError,
  setEditMode,
  setRefreshKey,
) => {
  setLoadingSubmit(true);
  try{
    await userService.updateUsername(userId,username);
    showNotification("success","Username was successfully updated!");
    setRefreshKey(Date.now());
    setEditMode("");
  }catch(err){
    if(err.response && err.response.status === 400){
      setUsernameError(err.response.data);
    }else{
      showNotification("error","An Unexpected error occurred!");
    }
  }
  setLoadingSubmit(false);
};

export const updateEmail = async ( 
  userId,
  email,
  showNotification,
  setLoadingSubmit,
  setEmailError,
  setEditMode,
  setRefreshKey,
) => {
  setLoadingSubmit(true);
  try{
    await userService.updateEmail(userId,email);
    showNotification("success","Email was successfully updated!");
    setRefreshKey(Date.now());
    setEditMode("");
  }catch(err){
    if(err.response && err.response.status === 400){
      setEmailError(err.response.data);
    }else{
      showNotification("error","An Unexpected Error Occurred!");
    }
  }
  setLoadingSubmit(false);
};
