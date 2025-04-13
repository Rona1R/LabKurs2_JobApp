import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function JobCard({
  title,
  city,
  timeLeft,
  companyLogo,
  category,
  employmentType,
}) {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 200,
          maxWidth: 350,
          objectFit: "contain",
        }}
        image={`${import.meta.env.VITE_IMAGE_PATH}/${companyLogo}`}
        alt="Company Logo"
      />

      <CardContent
        sx={{
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 700, color: "#0A0833", my: 4 }}
          noWrap
        >
          {title}
        </Typography>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PlaceIcon sx={{ fontSize: 18, color: "#777" }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#777", fontSize: 18 }}
              >
                {city}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 18, color: "#777" }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#777", fontSize: 18 }}
              >
                {timeLeft}
              </Typography>
            </Box>
          </Box>
          {/* <Box> */}
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#777", fontSize: 18 }}
            >
              {category},{employmentType}
            </Typography>
          {/* </Box> */}
        </Box>
      </CardContent>
    </Card>
  );
}

// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import PlaceIcon from "@mui/icons-material/Place";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";

// export default function JobCard({title,city,timeLeft,companyLogo}) {
//   return (
//     <Card
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         boxShadow: "0 4px 6px rgba(39, 38, 38, 0.1)",
//         border: "1px solid rgba(0, 0, 0, 0.12)",
//         transition: "box-shadow 0.3s",
//         "&:hover": {
//           boxShadow: "0 4px 6px rgba(3, 3, 53, 0.23)",
//         },
//       }}
//     >
//       <CardMedia
//         component="img"
//         sx={{
//           width: 151,
//           objectFit: "contain",
//           height: 151,
//           margin: "auto",
//         }}
//         image={`${import.meta.env.VITE_IMAGE_PATH}/${companyLogo}`}
//         alt="Company Logo"
//       />
//       <CardContent
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "100%",
//           minWidth:0
//         }}
//       >
//         <Typography
//           component="div"
//           variant="h5"
//           noWrap
//           sx={{ fontWeight: "bold", color: "#0A0833",width:"100%"}}
//         >
//           {title}
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//           }}
//         >
//           <Box sx={{ mr: 2 }}>
//             <PlaceIcon sx={{ color: "#0A0833" }} />
//             <Typography
//               variant="subtitle1"
//               component="div"
//               sx={{ color: "text.secondary", fontWeight: "bold" }}
//             >
//               {city}
//             </Typography>
//           </Box>
//           <Box>
//             <AccessTimeIcon sx={{ color: "#0A0833" }} />
//             <Typography
//               variant="subtitle1"
//               component="div"
//               sx={{ color: "text.secondary", fontWeight: "bold" }}
//             >
//               {timeLeft}
//             </Typography>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }
