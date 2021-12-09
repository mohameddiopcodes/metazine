import './styles/Navbar.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createProfile, getUser, LogOut, myProfiles, updateToken } from '../api/service'
import { useNavigate } from 'react-router-dom'
import onDataChange from '../utilities/onDataChange'

export default function Navbar({ user, setUser, profile, setProfile }) {

    const [profiles, setProfiles] = useState([])
    const [showProfiles, setShowProfiles] = useState(false)
    const [showProfileForm, setShowProfileForm] = useState(false)
    const [profileFormData, setProfileFormData] = useState({})
    const navigate = useNavigate()

    useEffect(function() {
        try {
            user && (async () => setProfiles(await myProfiles()))()
        } catch (e) {
            setProfiles([])
        }
    }, [profile, showProfileForm])

    async function handleNewProfile(e) {
        e.preventDefault()
        updateToken((await createProfile({...profileFormData, user: user._id})).token)
        setUser(getUser())
        setShowProfileForm(false)
        setProfileFormData({})
    }

    function handleProfileChange(e, p) {
        setProfile(p)
        localStorage.setItem('profile', p._id)
    }

    function handleLogOut() {
        LogOut()
        setUser(null)
        navigate('/auth')
    }
    return (
        <nav>
            {user ?
                <>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {profile && profile.image ? <Link to='/publishings'><img style={{width: '30px', height: '30px', borderRadius: '50%'}} src={`data:image;base64, ${profile.image}`}/></Link>:<Link to='/publishings'><img style={{width: '30px', height: '30px', borderRadius: '50%'}} src="/images/placeholder.jpeg"/></Link>}
                        {profile && <p style={{margin: '0 1%'}}>{profile.name}</p>}
                        <button onClick={() => setShowProfiles(!showProfiles)}>+</button>
                    </div>
                    {showProfiles && 
                        <div>
                            <div>
                                {
                                    profiles && profiles.map(p => (
                                        <button style={profile.name === p.name ? {backgroundColor: 'orangered', color: '#FEFEFE'}:{}} onClick={(e) => handleProfileChange(e, p)}>{p.name}</button>
                                        ))
                                    }
                            </div>
                            {showProfileForm &&
                                <form onSubmit={handleNewProfile} autoComplete='off'>
                                    <label style={{color: '#000'}} for='name'>Enter Name</label>
                                    <input type='text' name='name' onChange={(e) => onDataChange(e, setProfileFormData, profileFormData)} value={profileFormData.name || ''}/>
                                    <label style={{color: '#000'}} for='file'>Upload Image</label>
                                    <input type='file' name='image' onChange={(e) => onDataChange(e, setProfileFormData, profileFormData)}/>
                                    <input type='submit' />
                                </form>
                            }
                            <button onClick={() => setShowProfileForm(!showProfileForm)}>New Profile</button>
                            <button><Link to="/settings">Settings</Link></button>
                            <button onClick={handleLogOut}>LogOut</button>  
                        </div>
                    }
                    <Link to="/publishings">All Publishings</Link>{' | '}
                    <Link to="/publishings/me">My Publishings</Link>{' | '}
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