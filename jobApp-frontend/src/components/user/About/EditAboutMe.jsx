import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../dashboard/styles/crud.css";
import { TextField, Box, ThemeProvider } from "@mui/material";
import formTheme from "../../../components/dashboard/styles/formTheme";
import Spinner from "react-bootstrap/Spinner";
import { UserService } from "../../../api/sevices/UserService";
import { useNotification } from "../../../hooks/useNotification";
const userService = new UserService();

export default function EditAboutMe(props) {
  const [user,setUser] = React.useState(
    props.user
  );
  const [loading, setLoading] = React.useState(false);
  const { handleClose } = props;  
  const { showNotification } = useNotification();


  const handleChange = (e) => {
    setUser({
        ...user,aboutMe: e.target.value
    })
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // console.log(user);
      await userService.update(user.id,user);
      showNotification("success","'About Me' was successfully Updated!");
      props.refresh();
      props.handleClose();
    } catch (err) {
      showNotification("error","An Unexpected Error Occurred!");
      props.handleClose();
    }

    setLoading(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> About Me </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={formTheme}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
            >
              <TextField
                name="desription"
                label="Description"
                variant="outlined"
                value={user.aboutMe}
                onChange={handleChange}
                multiline
                rows={5}
              />
            </Box>
          </ThemeProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} className="crud-submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "10px" }}
                />
                Saving Changes ...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
