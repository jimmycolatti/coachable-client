const SessionForm = ({
  sessionFormData,
  submitHandler,
  changeHandler,
  dateAdapter,
  team,
}) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Date and Time: </label>
        <input
          type="datetime-local"
          name="date"
          value={sessionFormData.date}
          onChange={changeHandler}
        />
        <br />
        <label>Coachee: </label>
        <select>
          {team.forEach((coachee) => {
            return <option>{coachee.firstName}</option>
          })}
        </select>
        <br />
        <label>Notes: </label>
        <textarea
          name="notes"
          value={sessionFormData.notes}
          onChange={changeHandler}
        />
        <br />
        <label>Session complete: </label>
        <input
          type="checkbox"
          name="completed"
          value={sessionFormData.completed}
          onChange={changeHandler}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SessionForm

// date: new Date(),
// coachee: [],
// notes: "",
// completed: false,
