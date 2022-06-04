import { NavLink } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../contexts/UserContext"

const styles = {
  display: "flex",
  justifyContent: "space-around",
}

//Key difference between Link and NavLink is to have access to "isActive" object
const activeStyle = ({ isActive }) => {
  return { color: isActive ? "Red" : "Blue" }
}

const NavBar = () => {
  const { user } = useContext(UserContext)

  return (
    <div style={styles}>
      <NavLink to="/" style={activeStyle}>
        Home
      </NavLink>
      <NavLink to="login" style={activeStyle}>
        Login
      </NavLink>
      {/* If we have an authenticated user, then they are allowed to see the below links */}
    </div>
  )
}

export default NavBar
