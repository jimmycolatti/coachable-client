export const baseApiUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://coachable-app-api.herokuapp.com"
  } else {
    return "http://localhost:5005"
  }
}
