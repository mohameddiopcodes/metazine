import './styles/Auth.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logIn, signUp } from '../api/service'

export default function Auth({ setUser }) {
    const navigate = useNavigate()
    const [create, setCreate] = useState(false)
    const [error, setError] = useState('')
    const [disable, setDisable] = useState(false)

    const [userData, setUserData] = useState({})

    function switchToSignUp(e) {
        setCreate(true)
        setUserData({})
    }

    function switchToLogIn(e) {
        setCreate(false)
        setUserData({})
    }

    function onUserDataChange(e) {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    async function handleLogIn(e) {
        try {
            e.preventDefault()
            setUser(await logIn(userData))
            setUserData({})
            navigate('/publishings')
        } catch(e) {
            setError(e)
        }
    }

    async function handleSignUp(e) {
        try {
            e.preventDefault()
            setDisable(e.target.password === e.target.confirm)
            delete userData.confirm
            setUser(await signUp(userData))
            setUserData({})
            navigate('/publishings')
        } catch(e) {
            setError(e)
        }
    }

    return (
        <main>
            {error && <p>{error.message}</p>}
            {
                create ?
                    <form onSubmit={handleSignUp}>
                        <input type='text' name='name' onChange={onUserDataChange} value={userData.name || ''} />
                        <input type='text' name='email' onChange={onUserDataChange} value={userData.email || ''} />
                        <input type='text' name='password' onChange={onUserDataChange} value={userData.password || ''} />
                        <input type='text' name='confirm' onChange={onUserDataChange} value={userData.confirm || ''} />
                        <input type='submit' />
                        <button onClick={switchToLogIn}>already have an account ?</button>
                    </form>
                :
                    <form  onSubmit={handleLogIn}>
                        <input type='text' name='email' onChange={onUserDataChange} value={userData.email || ''} />
                        <input type='text' name='password' onChange={onUserDataChange} value={userData.password || ''} />
                        <input type='submit' onChange={onUserDataChange} />
                        <button disabled={disable} onClick={switchToSignUp}>create an account ?</button>
                    </form>
            }
        </main>
    )
}