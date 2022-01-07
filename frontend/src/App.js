import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import UploadDataset from './pages/UploadDataset';
import StoreOverview from './pages/StoreOverview';
import ViewDataset from './pages/ViewDataset';
import Search from './pages/Search';
import BrowseDataset from './pages/BrowseDataset';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from 'react';
import AuthContext from './context/auth.context';
import Logout from './pages/Logout';

function App() {
  const [auth, setAuth] = useState(true)

  const toggleAuth = () => setAuth(!auth) 

  if (auth === true) {
    return (
      <div className="h-screen w-screen overflow-hidden font-roboto">
        <AuthContext.Provider value={{isAuth: auth, toggleAuth, username: "An"}}>
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
      </div>
    )
  }
}

export default App;
