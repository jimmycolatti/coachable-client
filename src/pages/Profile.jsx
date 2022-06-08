import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import axios from "axios"

//components
import UserForm from "../components/UserForm"

//contexts
import UserContext from "../contexts/UserContext"

const Profile = () => {
  const { user, setUser } = useContext(UserContext)
  const [editToggler, setEditToggler] = useState(false)

  const defaultUserFormData = {
    firstName: "",
    lastName: "",
    email: "",
  }
  const [userFormData, setUserFormData] = useState(defaultUserFormData)

  // get id from url
  const { userID } = useParams()

  // get profile information from the database
  const getUserInfo = async () => {
    const { data } = await authAxios.get(
      `http://localhost:5005/profile/${userID}`
    )
    setUserFormData(() => data)
  }

  //update user information in the database
  const updateUserInfo = async () => {
    const { data } = await authAxios.post(
      `http://localhost:5005/profile/${userID}`,
      userFormData
    )
    // console.log(data)
    setUser(() => data)
    setUserFormData(() => data)
    setEditToggler(() => !editToggler)
  }

  const changeHandler = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      updateUserInfo()
    } catch (error) {
      console.error(error)
    }
  }

  const editHandler = (e) => {
    setEditToggler(() => !editToggler)
  }

  useEffect(() => {
    try {
      getUserInfo()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div>
      <h1>Profile - User info</h1>

      {user && !editToggler && (
        <div>
          <p>First Name: {userFormData.firstName}</p>
          <p>Last Name: {userFormData.lastName}</p>
          <p>Email: {userFormData.email}</p>
          <button onClick={editHandler}>Edit</button>
        </div>
      )}

      {editToggler && (
        <div>
          <UserForm
            userFormData={userFormData}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
          />
          <button onClick={editHandler}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default Profile
