import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link here
import Profile from "../../assets/profile.jpg";
import img1 from "../../assets/Post Images/img1.jpg";
// ... (other imports)

import "../Home/Home.css";
import Left from "../../Components/LeftSide/Left";
import Middle from "../../Components/MiddleSide/Middle";
import Right from '../../Components/RightSide/Right';
import Nav from '../../Components/Navigation/Nav';
import moment from 'moment/moment';

const Home = ({ setFriendsProfile }) => {
  const [posts, setPosts] = useState([
    // ... (initial posts data)
  ]);

  const [body, setBody] = useState("");
  const [importFile, setImportFile] = useState("");
  const [images, setImages] = useState(null);
  const [search, setSearch] = useState("");
  const [following, setFollowing] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  
  // Check authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual auth check logic

  useEffect(() => {
    // Simulate authentication check or fetch from API
    const checkAuth = async () => {
      // Replace with actual authentication check
      const response = await fetch('/api/check-auth');
      const result = await response.json();
      setIsAuthenticated(result.isAuthenticated);
    };
    checkAuth();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const username = "Vijay";
    const profilepicture = Profile;
    const datetime = moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow();
    const img = images ? { img: URL.createObjectURL(images) } : null;
    
    const obj = {
      id: id,
      profilepicture: profilepicture,
      username: username,
      datetime: datetime,
      img: img && (img.img),
      body: body,
      like: 0,
      comment: 0
    };
    
    setPosts([...posts, obj]);
    setBody("");
    setImages(null);
  };

  return (
    <div className='interface'>
      <Nav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      
      {isAuthenticated ? (
        <div className="home">
          <Left />
          <Middle 
            handleSubmit={handleSubmit}
            body={body}
            setBody={setBody}
            importFile={importFile}
            setImportFile={setImportFile}
            posts={posts}
            setPosts={setPosts}
            search={search}
            setFriendsProfile={setFriendsProfile}
            images={images}
            setImages={setImages}
          />
          <Right
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            following={following}
            setFollowing={setFollowing}
          />
        </div>
      ) : (
        <div className="login-redirect">
          <p>You need to log in to view this page. <Link to="/login">Log In</Link></p>
        </div>
      )}
    </div>
  );
};

export default Home;
