const SessionForm = ({
  sessionFormData,
  submitHandler,
  changeHandler,
  dateAdapter,
  team,
  checkHandler,
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
        <select
          name="coachee"
          value={sessionFormData.coachee}
          onChange={changeHandler}
        >
          <option value="" disabled>
            Select one--
          </option>
          {team.map((coachee) => {
            return (
              <option key={coachee._id} value={coachee._id}>
                {coachee.firstName} {coachee.lastName}
              </option>
            )
          })}
        </select>
        <br />
        <label>Description: </label>
        <textarea
          name="description"
          value={sessionFormData.description}
          onChange={changeHandler}
        />
        <br />
        <label>Session complete: </label>
        <input
          type="checkbox"
          name="completed"
          value={sessionFormData.completed}
          onChange={checkHandler}
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
