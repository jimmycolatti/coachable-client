const UserForm = ({ userFormData, submitHandler, changeHandler }) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={userFormData.firstName}
          onChange={changeHandler}
        />
        <br />
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={userFormData.lastName}
          onChange={changeHandler}
        />
        <br />
        <label>Preferred Name: </label>
        <input
          type="text"
          name="preferredName"
          value={userFormData.preferredName}
          onChange={changeHandler}
        />
        <br />
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={userFormData.email}
          onChange={changeHandler}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default UserForm
