import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from '../api/service'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ user, setUser, profile }) {

    const [showProfiles, setShowProfiles] = useState(false)

    const navigate = useNavigate()

    function handleLogOut() {
        LogOut()
        setUser(null)
        navigate('/auth')
    }
    return (
        <nav style={{marginTop: '2em'}}>
            {user ?
                <>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{margin: '0 1%'}}>{profile.name}</p>
                        <button onClick={() => setShowProfiles(!showProfiles)}>+</button>
                    </div>
                    {showProfiles && 
                        <div>
                            <p>'SHOW'</p>
                            <button onClick={handleLogOut}>LogOut</button>  
                        </div>
                    }
                    <Link to="/publishings">All Publishings</Link>{' | '}
                    <Link to={profile ? `/publishings/me/${profile._id}`:'#'}>My Publishings</Link>{' | '}
                    <Link to="/publishings/new">New Publishing</Link>
                </>
            :
                <>
                    <Link to="/">Home</Link>{' | '}
                    <Link to="/auth">Auth</Link>
                </>
            }
        </nav>
    )
}