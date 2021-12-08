import './App.css';
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MyPublishings from './pages/MyPublishings';
import Publishings from './pages/Publishings';
import Publishing from './pages/Publishing';
import NewPublishing from './pages/NewPublishing';
import Settings from './pages/Settings';

import {getUser, findProfile} from './api/service';

function App() {
  const [user, setUser] = useState(getUser())
  const [profile, setProfile] = useState((user && user.profiles[0]) || null)

  useEffect(function() {
    user && (async () => setProfile(await findProfile(localStorage.getItem('profile') || user.profiles[0])))()
  }, [user])
  
  return (
    <main className="App">
      {
        user ?
        <>
          <Navbar user={user} setUser={setUser} profile={profile} setProfile={setProfile} />
          <Routes>
            <Route path="/publishings/me" element={<MyPublishings profile={profile} />} />
            <Route path="/publishings" element={<Publishings />} />
            <Route path="/publishings/:id" element={<Publishing/>} />
            <Route path="/publishings/new" element={<NewPublishing profile={profile} />} />
            <Route path="/settings" element={<Settings profile={profile} />} />
          </Routes>
        </>
          :
        <>
          <Navbar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/auth" element={<Auth user={user} setUser={setUser} setProfile={setProfile} />} />
          </Routes>
        </>
      }
    </main>
  );
}

export default App;
