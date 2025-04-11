import { useState } from "react";
import { Divider, Box } from "@mui/material";
import "./styles/ProfilePage.css";
import { useParams } from "react-router";
import { useEffect } from "react";
import AboutMe from "src/components/user/About/AboutMe";
import Education from "src/components/user/Education/Education";
import Languages from "src/components/user/Languages/Languages";
import Experience from "src/components/user/WorkExperience/Experience";
import Skills from "src/components/user/Skills/Skills";
import DetailsSection from "src/components/user/ProfileDetails/DetailsSection";
import { UserProfileService } from "src/api/sevices/UserProfileService";
import ImageSection from "src/components/user/ProfileDetails/ImageSection";
import OpenToList from "src/components/user/ProfileDetails/OpenToSection/OpenToList";
import { useAuth } from "src/context/AuthContext";
const userProfileService = new UserProfileService();

export default function ProfilePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const isEditable = id === user?.nameid;
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
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
  const [profileDetails, setProfileDetails] = useState({
    userId: null,
    skills: [],
    openTo: {
      openToWork: "",
      businessOpportunities: "",
      providingServices: "",
      networking: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userProfileService.getById(id);
        setUserProfile(response.data.user);
        setProfileDetails(response.data.profile);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchData();
  }, [id, refreshKey]);

  return (
    <div>
      <ImageSection
        editable={isEditable}
        userId={id}
        userProfile={userProfile}
        loading={loading}
        setRefreshKey={setRefreshKey}
      />
      <Box
        sx={{
          backgroundColor: "white",
          mx: { lg: 20 },
          boxShadow: "0px 4px 6px rgba(107, 107, 107, 0.1)",
        }}
      >
        <div className="px-3 px-sm-5 py-2 d-flex flex-column gap-3 pb-6">
          <div
            className="position-relative rounded-circle border border-4 border-white overflow-hidden shadow-md profile-pic-container"
            style={{ marginTop: "-100px" }}
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
          <div>
            <h3 className="h3 text-dark fw-bold mb-3">
              {userProfile.name} {userProfile.lastName}
            </h3>
            <h5 className="h5 text-muted fw-bold mb-3">
              {userProfile.username}
            </h5>
            <p className="lead text-muted">{userProfile.email}</p>
          </div>
          <Skills
            editable={isEditable}
            userProfile={profileDetails}
            loading={loading}
            refresh={() => setRefreshKey(Date.now())}
          />

          <AboutMe
            editable={isEditable}
            // editable={true}
            userData={userProfile}
            isLoading={loading}
            refresh={() => setRefreshKey(Date.now())}
          />
          <DetailsSection
            editable={isEditable}
            profileDetails={profileDetails}
            refresh={() => setRefreshKey(Date.now())}
          />

          <OpenToList
            options={[
              {
                title: "Open To Work",
                description: profileDetails.openTo.openToWork,
              },
              {
                title: "Business Opportunities",
                description: profileDetails.openTo.businessOpportunities,
              },
              {
                title: "Providing Services",
                description: profileDetails.openTo.providingServices,
              },
              {
                title: "Networking",
                description: profileDetails.openTo.networking,
              },
            ]}
          />
          <Divider sx={{ backgroundColor: "gray" }} />

          <Experience editable={isEditable} userId={id} />

          <Divider sx={{ backgroundColor: "gray" }} />

          <Education editable={isEditable} userId={id} />

          <Divider sx={{ backgroundColor: "gray" }} />

          <Languages editable={isEditable} userId={id} />
        </div>
      </Box>
    </div>
  );
}
