import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//components
import NavBar from "./components/NavBar"

//pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Team from "./pages/Team"
import CoacheeProfile from "./pages/CoacheeProfile"
import Sessions from "./pages/Sessions"
import MeetingNotes from "./pages/MeetingNotes"

//providers
import { UserProvider } from "./contexts/UserContext"
import { ChakraProvider } from "@chakra-ui/react"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ChakraProvider>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              <Route path="/profile/:userID" element={<Profile />} />
              <Route path="/team/:userID" element={<Team />} />
              <Route path="/sessions/:userID" element={<Sessions />} />
              <Route
                path="/sessions/:userID/meeting/:sessionID"
                element={<MeetingNotes />}
              />
              <Route
                path="/team/:userID/coachee/:coacheeID"
                element={<CoacheeProfile />}
              />
            </Routes>
            {/* <Footer /> */}
          </div>
        </ChakraProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
