import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router";

function CustomDropdown(props) {
  return (
    <Dropdown style={{ marginLeft: 10, marginBottom: "1px" }}>
      <Dropdown.Toggle
        style={{
          color: "white",
          display: "block",
          fontFamily: "sans-serif",
          fontWeight: 700,
          letterSpacing: "2px",
          fontSize: "25px",
          backgroundColor: "inherit",
          boxShadow: "none",
          padding: "0",
          textTransform: "none"
        }}
      >
        {props.name}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ backgroundColor: "#f4f7ff", padding: "5px"}}>
        {props.options.map((option, index) => (
          <Dropdown.Item
            as="div"
            key={index}
            style={{ textAlign: "start",padding:0 }}
          >
            <Link
              to={`/jobPostings/category/${option.id}`}
              style={{
                color: "#0A0529",
                padding: "25px 20px",
                height: "100%",
                width: "100%",
                fontSize: "1.5em",
                letterSpacing: "1px",
                fontWeight: "bold",
                display: "block",
                transition: "color 0.3s ease"
              }}
              onMouseEnter={(e) => (e.target.style.color = "white",e.target.style.backgroundColor="#151034")}
              onMouseLeave={(e) => (e.target.style.color = "#0A0529",e.target.style.backgroundColor="inherit")}
            >
              {option.name}
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
