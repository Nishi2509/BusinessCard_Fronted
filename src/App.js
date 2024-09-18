import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import FriendsId from "./Pages/FriendsId/FriendsId";
import Notification from './Pages/Notification/Notification';
import Login from './Pages/RegisterPage/Login';
import SignUp from './Pages/RegisterPage/SignUp';
import Info from './Components/Profile/ProfileComponents/InfoProfile/Info'; // Import Info component

const App = () => {
  const [friendProfile, setFriendsProfile] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const [userPostData, setUserPostData] = useState([]);
  const [following, setFollowing] = useState(0);
  const [modelDetails, setModelDetails] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <div className='App'>
      <Routes>
        {/* If user is logged in, show Info as homepage, otherwise redirect to login */}
        <Route 
          path='/home' 
          element={isLoggedIn ? (
            <Info
              userPostData={userPostData}
              following={following}
              modelDetails={modelDetails}
              setModelDetails={setModelDetails}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
              name={name}
              setName={setName}
              userName={userName}
              setUserName={setUserName}
            />
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route 
          path='/profile' 
          element={isLoggedIn ? <Profile /> : <Navigate to="/" />} 
        />

        <Route 
          path='/friendsId' 
          element={isLoggedIn ? <FriendsId friendProfile={friendProfile} /> : <Navigate to="/" />} 
        />
      
        <Route 
          path='/notification' 
          element={isLoggedIn ? <Notification /> : <Navigate to="/" />} 
        />

        {/* Login and SignUp routes */}
        <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<SignUp />} />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
