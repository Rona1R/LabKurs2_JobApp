import { Link } from "react-router";
import Testimonials from "components/home/Testimonials";
import { Box, Typography } from "@mui/material";
import Collaborators from "components/home/Collaborators";
import Divider from "@mui/material/Divider";
import Introduction from "components/home/Introductions";
import Quote from "components/home/Quote";

export default function Index() {
  return (
    <>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: "url('/images/background-image.jpg')",
          height: 800,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3" style={{ fontSize: "50px" }}>
                Find Your Future Job
              </h1>
              <h4 className="mb-3" style={{ fontSize: "30px" }}>
                A platform that connects job seekers and employers worldwide
              </h4>
              <Link
                className="btn btn-outline-light btn-lg"
                to="/"
                role="button"
                style={{
                  padding: "10px 50px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  backgroundColor:"rgba(23, 25, 76, 0.256)"
                }}
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Collaborators />
        <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} />
        <Introduction />
        <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} />
        <Box marginTop={15} marginBottom={15}>
          <Typography variant="h2" sx={{ fontWeight: "bold", color: "#0A0529" ,paddingBottom:"30px"}}>
            Testimonials
          </Typography>
          <Testimonials />
        </Box>
        <Quote/>
      </div>
    </>
  );
}

