import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { signInWithGoogle, auth } from "../config/Fire"

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
    auth.signOut()
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

          <NavLink to={`sessions/${user._id}`} style={activeStyle}>
            Sessions
          </NavLink>

          <NavLink onClick={logoutHandler} to="/" style={activeStyle}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          {/* <NavLink to="login" style={activeStyle}>
            Login
          </NavLink> */}

          <button onClick={signInWithGoogle}>Log In With Google</button>
        </>
      )}
    </div>
  )
}

export default NavBar
