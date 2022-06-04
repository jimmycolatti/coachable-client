import axios from "axios"

const jwtToken = JSON.parse(localStorage.getItem("user"))

export const authAxios = axios.create({})

//This function intercept the axios request and add "Authorization" header with the token
authAxios.interceptors.request.use((config) => {
  if (jwtToken) config.headers["Authorization"] = `Bearer ${jwtToken.token}`
  return config
})

//If any axios request needs authorization, you need to use authAxios instead of regular axios
