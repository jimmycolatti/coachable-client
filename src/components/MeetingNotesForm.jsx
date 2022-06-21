const MeetingNotesForm = ({
  meetingNotes,
  submitHandler,
  changeHandler,
  checkHandler,
  dateTimeFormatter,
}) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Coachee: {meetingNotes.coachee[0].firstName}{" "}
          {meetingNotes.coachee[0].lastName}
        </label>
        <br />
        <label>Date: {dateTimeFormatter(meetingNotes.date)}</label>
        <br />
        <label>Description: </label>
        <br />
        <textarea
          name="description"
          value={meetingNotes.description}
          onChange={changeHandler}
        />
        <br />
        <label>Notes: </label>
        <br />
        <textarea
          name="notes"
          value={meetingNotes.notes}
          onChange={changeHandler}
        />
        <br />
        <label>Session complete: </label>
        <input
          type="checkbox"
          name="completed"
          checked={meetingNotes.completed}
          onChange={checkHandler}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default MeetingNotesForm
