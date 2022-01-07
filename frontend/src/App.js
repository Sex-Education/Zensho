import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import UploadDataset from './pages/UploadDataset';
import StoreOverview from './pages/StoreOverview';
import ViewDataset from './pages/ViewDataset';
import Search from './pages/Search';
import BrowseDataset from './pages/BrowseDataset';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import AuthContext from './context/auth.context';
import Logout from './pages/Logout';

function App() {
  const [auth,setAuth] = useState(false)
  const [username,setUsername] = useState(null)
  const [avatarUrl,setAvatarUrl] = useState("")

  useEffect(() => {
    console.log(auth, username)
  },[auth, username])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (localStorage.getItem("username")){
      setAvatarUrl(localStorage.getItem("avatar_url"))
      setUsername(localStorage.getItem("username"))
      setAuth(true)
    }
  },[])

  const toggleAuth = (a) => {
    setAuth(a) 
    console.log("set auth")
  }

  if (auth) {
    return (
      <div className="h-screen w-screen overflow-hidden font-roboto">
        <AuthContext.Provider value={{isAuth: auth, toggleAuth, username, setUser: setUsername, avatarUrl, setAvatarUrl}}>
          <Router>
            <Routes>
              <Route path='/profile' element={<><Logout/></>} />
              <Route path='/store' element={<><NavBar /><StoreOverview /></>} />
              <Route path='/upload' element={<><NavBar /><UploadDataset /></>} />
              <Route path='/dataset/:id' element={<><NavBar /><ViewDataset /></>} />
              <Route path='/search' element={<><NavBar /><Search /></>} />
              <Route path='/subscription' element={<><NavBar /></>} />
              <Route path='/browse' element={<><NavBar /><BrowseDataset /></>} />
              <Route
                path="*"
                element={<Navigate to="/store" />}
              />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    );
  }
  else {
    return (
      <div className="h-screen w-screen overflow-hidden font-roboto">
        <AuthContext.Provider value={{isAuth: auth, toggleAuth, username, setUser: setUsername}}>
          <Router>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route
                path="*"
                element={<Navigate to="/login" />}
              />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    )
  }
}

export default App;
