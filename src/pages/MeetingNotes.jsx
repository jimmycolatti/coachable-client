import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"

//components

const MeetingNotes = () => {
  const [meetingNotes, setMeetingNotes] = useState(null)
  const { userID, sessionID } = useParams()

  //getting session details from database using sessionID
  const getMeetingNotes = useCallback(async () => {
    const { data } = await authAxios.get(`
      http://localhost:5005/sessions/${userID}/meeting/${sessionID}
      `)
    setMeetingNotes(data)
  }, [userID, sessionID])

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

  console.log(meetingNotes)

  return (
    <div>
      <h1>Meeting Notes</h1>
      <div key={meetingNotes._id}>
        <p>Coachee: {meetingNotes.coachee[0].firstName}</p>
        <p>Date: {dateTimeFormatter(meetingNotes.date)}</p>
        <p>Complete: {meetingNotes.completed ? "Yes" : "No"}</p>
        <p>Description: </p>
      </div>
    </div>
  )
}

export default MeetingNotes
