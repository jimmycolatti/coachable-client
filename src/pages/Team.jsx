import { useContext, useEffect, useState } from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"

//components
import CoacheeForm from "../components/CoacheeForm"

//contexts
import UserContext from "../contexts/UserContext"

const Team = () => {
  const { user, setUser } = useContext(UserContext)
  const [team, setTeam] = useState([])
  const [addToggler, setAddToggler] = useState(false)

  const defaultCoacheeFormData = {
    firstName: "",
    lastName: "",
    email: "",
  }

  const [coacheeFormData, setCoacheeFormData] = useState(defaultCoacheeFormData)
  const navigateTo = useNavigate()

  // get id from url
  const { userID } = useParams()

  // get coachees from the database
  const getCoachees = async () => {
    const { data } = await authAxios.get(`http://localhost:5005/team/${userID}`)
    setTeam(() => data)
  }

  //add a new coachee to the database
  const addCoachee = async () => {
    const { data } = await authAxios.post(
      `http://localhost:5005/team/${userID}`,
      coacheeFormData
    )
    addHandler()
    setTeam(() => [...team, data])
  }

  const changeHandler = (e) => {
    setCoacheeFormData({ ...coacheeFormData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      addCoachee()
    } catch (error) {
      console.error(error)
    }
  }

  const addHandler = (e) => {
    setAddToggler(() => !addToggler)
  }

  useEffect(() => {
    try {
      getCoachees()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div>
      <h1>My Team</h1>

      {user && !addToggler && (
        <div>
          {team.map((coachee) => {
            return (
              <div key={coachee._id}>
                <p>
                  <Link to={coachee._id}>
                    {coachee.firstName} {coachee.lastName}
                  </Link>
                </p>
              </div>
            )
          })}
          <br />
          <button onClick={addHandler}>Add a Coachee</button>
        </div>
      )}

      {addToggler && (
        <div>
          <CoacheeForm
            coacheeFormData={coacheeFormData}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
          />
          <button onClick={addHandler}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default Team
