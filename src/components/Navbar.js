import { Link } from 'react-router-dom'
import { LogOut } from '../api/service'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ user, setUser }) {

    const navigate = useNavigate()

    function handleLogOut() {
        LogOut()
        setUser(null)
        navigate('/auth')
    }
    return (
        <nav>
            {user ?
                <>
                    {
                        user.profiles.map( p => <p>{p.name}</p> )
                    }
                    <Link to="/publishings">All Publishings</Link>{' | '}
                    <Link to="/publishings/me">My Publishings</Link>{' | '}
                    <Link to="/publishings/new">New Publishing</Link>
                    <button onClick={handleLogOut}>LogOut</button>
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