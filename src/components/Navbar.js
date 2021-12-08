import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createProfile, LogOut, myProfiles, updateToken } from '../api/service'
import { useNavigate } from 'react-router-dom'
import onDataChange from '../utilities/onDataChange'

export default function Navbar({ user, setUser, profile, setProfile }) {

    const [profiles, setProfiles] = useState(false)
    const [showProfiles, setShowProfiles] = useState(false)
    const [showProfileForm, setShowProfileForm] = useState(false)
    const [profileFormData, setProfileFormData] = useState({})
    const navigate = useNavigate()

    useEffect(function() {
        user && (async () => setProfiles(await myProfiles()))()
    }, [])

    function handleNewProfile(e) {
        e.preventDefault()
        createProfile({...profileFormData, user: profile.user})
            .then(updateToken)
            .catch(e => console.log(e))
        setProfileFormData({})
    }

    function handleProfileChange(p) {
        setProfile(p)
        localStorage.setItem('profile', p._id)
        setShowProfileForm(false)
        setShowProfiles(false)
    }

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
                        {profile && profile.image ? <img style={{width: '30px', height: '30px', borderRadius: '50%'}} src={`data:image;base64, ${profile.image}`}/>:<img style={{width: '30px', height: '30px', borderRadius: '50%'}} src="/images/placeholder.jpeg"/>}
                        {profile && <p style={{margin: '0 1%'}}>{profile.name}</p>}
                        <button onClick={() => setShowProfiles(!showProfiles)}>+</button>
                    </div>
                    {showProfiles && 
                        <div>
                            <div>
                                {
                                    profiles && profiles.map(p => (
                                        <button style={profile.name === p.name ? {backgroundColor: 'orangered', color: '#FEFEFE'}:{}} onClick={() => handleProfileChange(p)}>{p.name}</button>
                                        ))
                                    }
                            </div>
                            {showProfileForm &&
                                <form onSubmit={handleNewProfile}>
                                    <input type='text' name='name' onChange={(e) => onDataChange(e, setProfileFormData, profileFormData)} value={profileFormData ? profileFormData.name:''}/>
                                    <input type='file' name='image' onChange={(e) => onDataChange(e, setProfileFormData, profileFormData)}/>
                                    <input type='submit' />
                                </form>
                            }
                            <button onClick={() => setShowProfileForm(!showProfileForm)}>New Profile</button>
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