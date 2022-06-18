import { useContext, useEffect, useState, useCallback } from "react"
import { Link, useParams } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format } from "date-fns"
import SessionForm from "../components/SessionForm"

//components

//contexts
import UserContext from "../contexts/UserContext"

const Sessions = () => {
  const { user } = useContext(UserContext)
  const [team, setTeam] = useState([])
  console.log(team)
  const [sessions, setSessions] = useState([])
  const [addToggler, setAddToggler] = useState(false)
  //   const [completed, setCompleted] = useState(false)

  const defaultSessionFormData = {
    date: new Date(),
    coachee: [],
    notes: "",
    completed: false,
  }

  const [sessionFormData, setSessionFormData] = useState(defaultSessionFormData)

  // get id from url
  const { userID } = useParams()

  // get sessions and coachees from the database
  const getSessions = useCallback(async () => {
    const { data } = await authAxios.get(
      `http://localhost:5005/sessions/${userID}`
    )
    console.log(data)
    setSessions(() => data.sessions)
    setTeam(() => data.team)
  }, [userID])

  //add a new session to the database
  const addSession = async () => {
    const { data } = await authAxios.post(
      `http://localhost:5005/sessions/${userID}`,
      sessionFormData
    )
    addHandler()
  }

  const changeHandler = (e) => {
    setSessionFormData({ ...sessionFormData, [e.target.name]: e.target.value })
  }

  const checkHandler = (e) => {
    console.log("The checkbox was toggled")

    setSessionFormData({
      ...sessionFormData,
      [e.target.name]: e.target.checked,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    try {
      addSession()
      setSessionFormData(() => defaultSessionFormData)
    } catch (error) {
      console.error(error)
    }
  }

  const addHandler = (e) => {
    setAddToggler(() => !addToggler)
    setSessionFormData(() => defaultSessionFormData)
  }

  useEffect(() => {
    try {
      getSessions()
    } catch (error) {
      console.error(error)
    }
  }, [getSessions])

  return (
    <div>
      <h1>Coaching Sessions</h1>

      {user && !addToggler && (
        <div>
          <button onClick={addHandler}>Create a Session</button>
        </div>
      )}

      {addToggler && (
        <div>
          <SessionForm
            sessionFormData={sessionFormData}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            checkHandler={checkHandler}
            dateAdapter={AdapterDateFns}
            team={team}
          />
          <br />
          <button onClick={addHandler}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default Sessions
