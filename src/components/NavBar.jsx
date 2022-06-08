import { NavLink } from "react-router-dom"
import { useState, useContext } from "react"

//context
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
  const { user, setUser } = useContext(UserContext)

  const logoutHandler = (e) => {
    setUser(() => null)
  }

  return (
    <div style={styles}>
      <NavLink to="/" style={activeStyle}>
        Home
      </NavLink>

      {/* If we have an authenticated user, then they are allowed to see the below links */}
      {user ? (
        <>
          <NavLink to={`profile/${user._id}`} style={activeStyle}>
            Profile
          </NavLink>

          <NavLink to={`team/${user._id}`} style={activeStyle}>
            Team
          </NavLink>

          <NavLink onClick={logoutHandler} to="login" style={activeStyle}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="login" style={activeStyle}>
            Login
          </NavLink>
        </>
      )}
    </div>
  )
}

export default NavBar
