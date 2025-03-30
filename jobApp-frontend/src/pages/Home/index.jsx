import { Link } from "react-router";
import Testimonials from "../../components/home/Testimonials";
import { Box, Typography } from "@mui/material";
import Collaborators from "../../components/home/Collaborators";
import Divider from "@mui/material/Divider";
import Introduction from "../../components/home/Introductions";
import Quote from "../../components/home/Quote";
import Navigation from "src/components/layout/user/Navigation";
import Footer from "src/components/layout/user/Footer";
import "./index.css";
export default function Index() {
  return (
    <>
      <Navigation isTransparent={true} />
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply')",
          height: 1100,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="mask">
          <div className="d-flex align-items-center h-100">
            <div className="text-white text-start bg-text">
              <p
                className="mb-3 fw-bold section-title"
                style={{ color: "rgba(178, 181, 255, 0.75)" }}
              >
                Find Your Future Job
              </p>

              <p
                className="mb-5 section-text"
                style={{
                  // fontSize: "25px",
                  letterSpacing: 1,
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  maxWidth: "650px",
                }}
              >
                A global platform dedicated to bridging the gap between job
                seekers and employers, offering a comprehensive suite of tools
                and resources to connect talent with opportunities across
                diverse industries worldwide.
              </p>

              <div
                className="d-flex flex-wrap gap-4 text-section"
              >
                <p>
                  <span aria-hidden="true">&rarr;</span> Grow your career{" "}
                </p>
                <p>
                  {" "}
                  <span aria-hidden="true">&rarr;</span> Build your profile
                </p>
                <p>
                  <span aria-hidden="true">&rarr;</span> Expand your network
                </p>
              </div>
              <Link
                className="btn btn-outline-light btn-lg"
                to="/"
                role="button"
                style={{
                  padding: "10px 50px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  border: "2px solid rgba(87, 92, 240, 0.97)",
                  backgroundColor: "rgba(23, 25, 76, 0.256)",
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
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", color: "#0A0529", paddingBottom: "30px" }}
          >
            Testimonials
          </Typography>
          <Testimonials />
        </Box>
        <Quote />
      </div>
      <Footer />
    </>
  );
}
