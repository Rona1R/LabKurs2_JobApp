import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Language from "../Language";
import { createTheme, ThemeProvider,IconButton} from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import { UserLanguageService } from "api/sevices/UserLanguageService";
import Loading from "components/common/Loading";
import NoDataYet from "components/common/NoDataYet";
import AddLanguage from "./AddLanguage";
import UpdateLanguage from "./UpdateLanguage";
import DeleteLanguage from "./DeleteLanguage";
const userLanguageService = new UserLanguageService();

export default function Languages(props) {
  const [selected, setSelected] = useState(null);
  const [showCreate,setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await userLanguageService.getByUser(props.userId);
        setLanguages(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, refreshKey]);
  
  const theme = createTheme({
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: "#0A0529",
            fontWeight: "bold",
            fontSize: "1.5rem",
            padding: "15px 5px",
          },
        },
      },
    },
  });

  return (
    <>

      {showCreate && (
        <AddLanguage
          userId={props.userId}
          handleClose={() => setShowCreate(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      {
       selected && showEdit && (
        <UpdateLanguage
          id = {selected}
          handleClose={() => setShowEdit(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
       ) 
      }

      {
      selected && showDelete && (
          <DeleteLanguage
            id = {selected}
            handleClose={() => setShowDelete(false)}
            refresh={() => setRefreshKey(Date.now())}
          />
        )
      }

      <div style={{ width: "100%", backgroundColor: "white" }}>
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Typography
          variant="h4"
          sx={{
            color: "#151034",
            fontWeight: "bold",
            marginBottom: "1em",
            marginTop: "1em",
          }}
        >
          Languages
          <IconButton
            sx={{ mx: 1, color: "hsl(218, 94.40%, 21.20%)" }}
            onClick={() => setShowCreate(true)}
          >
            <AddIcon sx={{ fontSize: "2em" }} />
          </IconButton>
        </Typography>
        <ThemeProvider theme={theme}>
          {loading ? (
            <div style={{ marginTop: "150px", marginBottom: "150px" }}>
              <Loading />
            </div>
          ) : languages.length === 0 ? (
            <div className="mt-5 mb-5">
              <NoDataYet message={"Languages have not been listed yet"} />
            </div>
          ) : (
            <List
              component="nav"
              sx={{
                margin: "40px 30px auto",
                backgroundColor: "#f7f7f7",
                borderRadius: "30px",
                [theme.breakpoints.up("md")]: {
                  margin: "40px 60px auto",
                },
                [theme.breakpoints.up("lg")]: {
                  margin: "40px 200px auto",
                },
                [theme.breakpoints.up("xl")]: {
                  margin: "40px 350px auto",
                },
              }}
            >
              {languages.map((language, index) => (
                <React.Fragment key={index}>
                  <Language
                    editable={true}
                    id={language.id}
                    setSelected={setSelected}
                    showEdit={setShowEdit}
                    showDelete={setShowDelete}
                    name={language.languageName}
                    level={language.proficiencyLevel}
                  />
                  {index < languages.length - 1 && (
                    <Divider sx={{ backgroundColor: "gray" }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </ThemeProvider>
      </div>
    </>
  );
}
