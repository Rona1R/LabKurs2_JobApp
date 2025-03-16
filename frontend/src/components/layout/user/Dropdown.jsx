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
          fontSize: "18px",
          backgroundColor: "inherit",
          boxShadow: "none",
          padding: "0",
        }}
      >
        {props.name}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ backgroundColor: "#f4f7ff", padding: "5px" }}>
        {props.options.map((option, index) => (
          <Dropdown.Item
            as="div"
            key={index}
            style={{ padding: "30px 20px", textAlign: "start" }}
          >
            <Link
              to="/"
              style={{
                color: "#0A0529",
                fontSize: "large",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
            >
              {option.name}
            </Link>
          </Dropdown.Item>
        ))}
        {/* {props.options.map((option,index)=>(
             <Dropdown.Item  as="div"  key={index} style={{padding:"30px 20px",textAlign:"start"}}>
                <Link to={option.link} style={{color:"#0A0529",fontSize:"large",letterSpacing:"1px",fontWeight:"bold"}}>
                    {option.name}
                </Link>
            </Dropdown.Item>
        ))} */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
