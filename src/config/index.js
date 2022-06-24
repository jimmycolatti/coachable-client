export const baseApiUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return window.location.origin
  } else {
    return "http://localhost:5005"
  }
}
