import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"

//components
import MeetingNotesForm from "../components/MeetingNotesForm"

const MeetingNotes = () => {
  const [meetingNotes, setMeetingNotes] = useState(null)
  const { userID, sessionID } = useParams()
  const [editToggler, setEditToggler] = useState(false)

  const editHandler = (e) => {
    setEditToggler(() => !editToggler)
  }

  const navigateTo = useNavigate()

  //getting session details from database using sessionID
  const getMeetingNotes = useCallback(async () => {
    const { data } = await authAxios.get(`
      http://localhost:5005/sessions/${userID}/meeting/${sessionID}
      `)
    setMeetingNotes(data)
  }, [userID, sessionID])

  //update coachee details in the database
  const updateMeetingNotes = async () => {
    const { data } = await authAxios.post(
      `http://localhost:5005/sessions/${userID}/meeting/${sessionID}`,
      meetingNotes
    )
    console.log(data)
    setMeetingNotes(() => data)
    setEditToggler(() => !editToggler)
  }

  //delete session from the database
  const deleteSession = async () => {
    const { data } = await authAxios.delete(
      `http://localhost:5005/sessions/${userID}/meeting/${sessionID}`
    )
    navigateTo(`/sessions/${userID}`)
  }

  useEffect(() => {
    try {
      getMeetingNotes()
    } catch (error) {
      console.error()
    }
  }, [getMeetingNotes])

  const dateTimeFormatter = (formDate) => {
    let dtFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    let date = new Date(formDate)
    return dtFormat.format(date)
  }

  const changeHandler = (e) => {
    setMeetingNotes({ ...meetingNotes, [e.target.name]: e.target.value })
  }

  const checkHandler = (e) => {
    setMeetingNotes({
      ...meetingNotes,
      [e.target.name]: e.target.checked,
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await updateMeetingNotes()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteHandler = () => {
    try {
      deleteSession()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    meetingNotes && (
      <div>
        <h1>Meeting Notes</h1>

        {!editToggler && (
          <div key={meetingNotes._id}>
            <p>
              Coachee: {meetingNotes.coachee[0].firstName}{" "}
              {meetingNotes.coachee[0].lastName}
            </p>
            <p>Date: {dateTimeFormatter(meetingNotes.date)}</p>
            <p>Complete: {meetingNotes.completed ? "Yes" : "No"}</p>
            <p>Description: {meetingNotes.description}</p>
            <p>Notes: {meetingNotes.notes}</p>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        )}

        {editToggler && (
          <div>
            <MeetingNotesForm
              meetingNotes={meetingNotes}
              dateTimeFormatter={dateTimeFormatter}
              submitHandler={submitHandler}
              changeHandler={changeHandler}
              checkHandler={checkHandler}
            />
            <button onClick={editHandler}>Cancel</button>
          </div>
        )}
      </div>
    )
  )
}

export default MeetingNotes
