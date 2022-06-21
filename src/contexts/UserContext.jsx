import { createContext, useState, useEffect } from "react"
import { getRedirectResult } from "firebase/auth"
import { auth } from "../config/Fire"
import { authAxios } from "../customAxios/authAxios"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  //Get user data from local storage, if there's none then sets the user state to null
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  )

  //Once user is authenticated, store the user data in local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  const fetchUser = async () => {
    try {
      const { user } = (await getRedirectResult(auth)) ?? {}
      if (user) {
        const { data: authUser } = await authAxios.post(
          `http://localhost:5005/google`,
          user
        )
        setUser(authUser)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    //Whichever states/function we want to use as a global variable(useState), you have to pass it as a value
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext

//To create a context
//1. Create a context.jsx file, add all the necessary boilerplate code and the states
//2. Wrap your App with contexProvider in App.js
//3. Use useContext(contextName) method to get your states values in any components/pages you want.
