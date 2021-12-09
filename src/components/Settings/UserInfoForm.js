import { useState } from "react"
import { findProfile, getUser, updateToken, updateUser } from "../../api/service"

export default function UserInfoForm({ unselect, handleOnDataChange, setProfile, formData }) {
    const [ error, setError ] = useState('')
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if(formData.password !== formData.confirm) throw new Error("The passwords don't match")
            const data = {...formData}
            delete data.confirm
            updateToken( (await updateUser(data)).token )
            setProfile(await findProfile(localStorage.getItem('profile') || getUser().profiles[0]))
            unselect(null, 'Your information was succesfully updated')
        } catch(e) {
            setError(e.message)
        }
    }

    return (
        <>
        { error && <p>{error}</p> }
        <form onSubmit={handleSubmit} >
            <h4>Edit User Information</h4>
            <button onClick={unselect}>Go Back</button>
            <input type='text' name='name' onChange={handleOnDataChange} />
            <input type='text' name='email' onChange={handleOnDataChange} />
            <input type='password' name='password' onChange={handleOnDataChange} />
            <input type='password' name='confirm' onChange={handleOnDataChange} />
            <input type='submit'/>
        </form>
        </>
    )
}