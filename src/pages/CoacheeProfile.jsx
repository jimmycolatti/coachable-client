import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
//components
import CoacheeForm from "../components/CoacheeForm"

const CoacheeProfile = () => {
  const defaultCoacheeFormData = {
    firstName: "",
    lastName: "",
    email: "",
  }

  const [coacheeFormData, setCoacheeFormData] = useState(defaultCoacheeFormData)
  const { userID, coacheeID } = useParams()
  const [coachee, setCoachee] = useState(null)
  const [editToggler, setEditToggler] = useState(false)
  const navigateTo = useNavigate()

  const editHandler = (e) => {
    setEditToggler(() => !editToggler)
  }

  //getting coachee details from database using coacheeID
  const getCoacheeDetails = async () => {
    const { data } = await authAxios.get(
      `http://localhost:5005/team/${userID}/coachee/${coacheeID}`
    )
    setCoachee(() => data)
    setCoacheeFormData(() => data)
  }

  //update coachee details in the database
  const updateCoacheeDetails = async () => {
    const { data } = await authAxios.post(
      `http://localhost:5005/team/${userID}/coachee/${coacheeID}`,
      coacheeFormData
    )
    setCoachee(() => data)
    setEditToggler(() => !editToggler)
  }

  //delete coachee from the database
  const deleteCoachee = async () => {
    const { data } = await authAxios.delete(
      `http://localhost:5005/team/${userID}/coachee/${coacheeID}`
    )
    navigateTo(`/team/${userID}`)
  }

  useEffect(() => {
    try {
      getCoacheeDetails()
    } catch (error) {
      console.error(error)
    }
  }, [])

  const changeHandler = (e) => {
    setCoacheeFormData({ ...coacheeFormData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      updateCoacheeDetails()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteHandler = () => {
    try {
      deleteCoachee()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {coachee && (
        <div key={coachee._id}>
          <h1>{coachee.firstName}'s Profile</h1>

          {!editToggler && (
            <div>
              <p>First Name: {coachee.firstName}</p>
              <p>Last Name: {coachee.lastName}</p>
              <p>Email: {coachee.email}</p>
              <button onClick={editHandler}>Edit</button>
              <button onClick={deleteHandler}>Delete</button>
            </div>
          )}

          {editToggler && (
            <div>
              <CoacheeForm
                coacheeFormData={coacheeFormData}
                submitHandler={submitHandler}
                changeHandler={changeHandler}
              />
              <button onClick={editHandler}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CoacheeProfile
