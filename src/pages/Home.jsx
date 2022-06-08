//Need to import two things to use context on any page/components
import { useContext } from "react"
import UserContext from "../contexts/UserContext"

const Home = () => {
  //Get the user value from the UserContext
  const { user } = useContext(UserContext)

  // console.log(user)

  return (
    <div>
      <h1>
        {user ? `Welcome ${user.firstName || user.email}!!!` : "Coachable"}
      </h1>
    </div>
  )
}

export default Home
