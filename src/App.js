import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//components
import NavBar from "./components/NavBar"

//pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

//providers
import { UserProvider } from "./contexts/UserContext"

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/profile/:userID" element={<Profile />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
