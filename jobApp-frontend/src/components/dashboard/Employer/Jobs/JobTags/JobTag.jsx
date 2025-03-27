import Chip from "@mui/material/Chip";
export default function JobTag({ label, id ,editable, handleDelete }) {
  // const handleDelete = () => {
  //   console.info("You clicked the delete icon.");
  // };

  return (
    <>
      {editable ? (
        <Chip
          sx={{
            "& .MuiChip-label": {
              fontWeight: "bold",
              color: "#333333",
              fontSize: "larger",
            },
          }}
          label={label}
          onDelete={() => handleDelete(id)} 
        />
      ) : (
        <Chip
          label={label}
          sx={{
            "& .MuiChip-label": {
              fontWeight: "bold",
              color: "#333333",
              fontSize: "larger",
            },
          }}
        />
      )}
    </>
  );
}
