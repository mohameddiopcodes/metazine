import { useState } from "react"
import { getUser, LogOut, updateToken, deleteProfile, deletePublishing, deleteAccount } from "../api/service"
import { useNavigate } from "react-router-dom"


export default function DeleteConfirmation({ entity, unselect, handleOnDataChange, formData, profile, setUser, setRootMessage, publishingId }) {
    const [ error, setError ] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const navigate = useNavigate()

    async function handleDelete(e) {
        try {
            e.preventDefault()
            if(formData.password !== formData.confirm) throw new Error("The passwords don't match")
            const data = {...formData}
            delete data.confirm
            if(entity === 'account') {
                await deleteAccount(data)
                navigate('/')
                LogOut()
                setRootMessage('Your account has succesfully been deleted.')
                setUser(null)
            } else if(entity === 'profile') {
                updateToken( (await deleteProfile(profile._id, data)).token )
                setUser(getUser())
                localStorage.removeItem('profile')
                unselect(null, 'Profile successfully deleted')
            } else if(entity === 'publishing') {
                await deletePublishing(publishingId, data)
                navigate('/publishings/me')
                unselect(null, 'Publishing successfully deleted')
            }
        } catch(e) {
            setError(e.message)
        }
    }

    return (
        <>
            {error && <p class='render-error'>{error}</p>}
            <h2>You are about to delete your {entity}.</h2>
            <p>Are you sure ?</p>
            <button onClick={() => setConfirmed(!confirmed)}>Yes</button>
            <button onClick={unselect}>No</button>
            {
                confirmed &&
                    <form onSubmit={handleDelete} autoComplete='off'>
                        <label for='password' >Enter Password</label>
                        <input type='password' name='password' onChange={handleOnDataChange} />
                        <label for='confirm' >Confirm Password</label>
                        <input type='password' name='confirm' onChange={handleOnDataChange} />
                        <input type='submit' />
                    </form>
            }
        </>
    )
}