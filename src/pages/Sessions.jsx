import { useContext, useEffect, useState, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import SessionForm from "../components/SessionForm"
import { baseApiUrl } from "../config"

//components

//contexts
import UserContext from "../contexts/UserContext"

const Sessions = () => {
  const { user } = useContext(UserContext)
  const [team, setTeam] = useState([])
  const [sessions, setSessions] = useState([])
  const [addToggler, setAddToggler] = useState(false)

  const defaultSessionFormData = {
    date: new Date(),
    coachee: [],
    description: "",
    notes: "",
    completed: false,
  }

  const [sessionFormData, setSessionFormData] = useState(defaultSessionFormData)

  // get id from url
  const { userID } = useParams()

  // get sessions and coachees from the database
  const getSessions = useCallback(async () => {
    const { data } = await authAxios.get(`${baseApiUrl()}/sessions/${userID}`)
    setSessions(() => data.sessions)
    setTeam(() => data.team)
  }, [userID])

  //add a new session to the database
  const addSession = async () => {
    const { data } = await authAxios.post(
      `${baseApiUrl()}/sessions/${userID}`,
      sessionFormData
    )
    const sortedSessions = [...sessions, data].sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })

    setSessions(sortedSessions)
    addHandler()
  }

  const changeHandler = (e) => {
    setSessionFormData({ ...sessionFormData, [e.target.name]: e.target.value })
  }

  const checkHandler = (e) => {
    // console.log("The checkbox was toggled")

    setSessionFormData({
      ...sessionFormData,
      [e.target.name]: e.target.checked,
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await addSession()
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

  const dateFormatter = (formDate) => {
    let dtFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    let date = new Date(formDate)
    return dtFormat.format(date)
  }

  const timeFormatter = (formDate) => {
    let dtFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
    let date = new Date(formDate)
    return dtFormat.format(date)
  }

  const findCoacheeById = (coacheesIds) => {
    const foundCoachees = team.filter((coachee) => {
      return coacheesIds.includes(coachee._id)
    })
    return foundCoachees
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
      .join(", ")
  }

  return (
    <div>
      <h1>Coaching Sessions</h1>

      {user && !addToggler && (
        <div>
          <button onClick={addHandler}>Create a Session</button>
          <br />
          {sessions.map((s) => {
            return (
              <div key={s._id}>
                <p>Date: {dateFormatter(s.date)}</p>
                <p>Time: {timeFormatter(s.date)}</p>
                <p>Coachee: {findCoacheeById(s.coachee)}</p>
                <p>Description: {s.description}</p>
                <p>Complete: {s.completed ? "Yes" : "No"}</p>
                <Link to={`meeting/${s._id}`}>See Notes</Link>
                <hr />
              </div>
            )
          })}
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
