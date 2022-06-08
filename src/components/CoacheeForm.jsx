const CoacheeForm = ({ coacheeFormData, submitHandler, changeHandler }) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={coacheeFormData.firstName}
          onChange={changeHandler}
        />
        <br />
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={coacheeFormData.lastName}
          onChange={changeHandler}
        />
        <br />
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={coacheeFormData.email}
          onChange={changeHandler}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CoacheeForm
