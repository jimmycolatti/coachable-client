import { useState, useContext } from "react"
import axios from "axios"
import { baseApiUrl } from "../config"

//context
import UserContext from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const defaultFormData = {
    email: "",
    password: "",
  }

  //Getting setUser function from UserContext to update the user
  const { user, setUser } = useContext(UserContext)
  //This function will help navigate between routes
  const navigateTo = useNavigate()

  const [loginState, setLoginState] = useState("login")

  const [formData, setFormData] = useState(defaultFormData)

  //Updating the user value from input field
  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const submitFormData = async () => {
    try {
      const { data } = await axios.post(
        `${baseApiUrl()}/${loginState}`,
        formData
      )
      setUser(() => data)
    } catch (error) {
      console.error(error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    submitFormData()
    navigateTo("/")
  }

  const logoutHandler = (e) => {
    setUser(() => null)
  }

  return user ? (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  ) : (
    <div>
      <h1>{loginState}</h1>
      <p>Please Register/Login</p>
      <button onClick={() => setLoginState("login")}>Login</button>
      <button onClick={() => setLoginState("register")}>Register</button>

      <form onSubmit={submitHandler}>
        <label>Email: </label>
        <input
          type="text"
          name="email"
          onChange={changeHandler}
          value={formData.email}
        />
        <br />
        <label>Password: </label>
        <input
          type="text"
          name="password"
          onChange={changeHandler}
          value={formData.password}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login
