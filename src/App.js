import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MyPublishings from './pages/MyPublishings';
import Publishings from './pages/Publishings';
import NewPublishing from './pages/NewPublishing';

import {getUser} from './api/service';

function App() {
  const [user, setUser] = useState(null)

  return (
    <main className="App">
      <p>{user && user.name}</p>
      {
        user ?
        <>
          <Navbar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/publishings/me" element={<MyPublishings/>} />
            <Route path="/publishings" element={<Publishings/>} />
            <Route path="/publishings/new" element={<NewPublishing/>} />
          </Routes>
        </>
          :
        <>
          <Navbar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/auth" element={<Auth setUser={setUser} />} />
          </Routes>
        </>
      }
    </main>
  );
}

export default App;
