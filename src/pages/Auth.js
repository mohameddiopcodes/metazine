import './styles/Auth.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logIn, signUp } from '../api/service'
import onDataChange from '../utilities/onDataChange'

export default function Auth({ user, setUser, setProfile, setRootMessage }) {
    const navigate = useNavigate()
    const [create, setCreate] = useState(false)
    const [error, setError] = useState('')

    const [userData, setUserData] = useState({})

    function switchToSignUp(e) {
        setCreate(true)
        setUserData({})
    }

    function switchToLogIn(e) {
        setCreate(false)
        setUserData({})
    }

    async function handleLogIn(e) {
        try {
            e.preventDefault()
            const user = await logIn(userData)
            setUser(user)
            setProfile(user.profiles[0])
            setUserData({})
            navigate('/publishings')
        } catch(e) {
            setError(e.message)
        }
    }

    async function handleSignUp(e) {
        try {
            e.preventDefault()
            if(userData.password !== userData.confirm) throw new Error("The passwords don't match")
            delete userData.confirm
            setUser(await signUp(userData))
            setUserData({})
            navigate('/publishings')
        } catch(e) {
            setError(e.message)
        }
    }

    useEffect(function() {
        setRootMessage('')
    }, [])

    return (
        <main>
            {error && <p>{error}</p>}
            {
                create ?
                    <form onSubmit={handleSignUp}>
                        <input type='text' name='name' onChange={(e) => onDataChange(e, setUserData, userData)} value={userData.name || ''} />
                        <input type='text' name='email' onChange={(e) => onDataChange(e, setUserData, userData)} value={userData.email || ''} />
                        <input type='password' name='password' onChange={(e) => onDataChange(e, setUserData, userData)} value={userData.password || ''} />
                        <input type='password' name='confirm' onChange={(e) => onDataChange(e, setUserData, userData)} value={userData.confirm || ''} />
                        <input type='submit' />
                        <button onClick={switchToLogIn}>already have an account ?</button>
                    </form>
                :
                    <form  onSubmit={handleLogIn}>
                        <input type='text' name='email' onChange={(e) => onDataChange(e, setUserData, userData)} value={userData.email || ''} />
                        <input type='password' name='password' onChange={(e) => onDataChange(e, setUserData, userData)} value={userData.password || ''} />
                        <input type='submit' onChange={(e) => onDataChange(e, setUserData, userData)} />
                        <button onClick={switchToSignUp}>create an account ?</button>
                    </form>
            }
        </main>
    )
}