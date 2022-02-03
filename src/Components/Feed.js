import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import UploadFile from './UploadFile';
import Posts from './Posts';
import { database } from '../firebase';
import Navbar from './Navbar';

function Feed() {
  const { logout, user } = useContext(AuthContext);
  const [userData, setUserData] = useState('');
  useEffect(() => {
    let unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    })
    return () => { unsub() }
  }, [user]);
  return (
    <>
      <Navbar userData={userData} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
        {/* <div className="comp" style={{ width: '50%' }}>
        <h1>Welcome to Feed</h1>
        <button onClick={logout}>Logout</button>
      </div> */}
        <UploadFile user={userData} />
        <Posts userData={userData} />
      </div>
    </>
  );
}

export default Feed;
