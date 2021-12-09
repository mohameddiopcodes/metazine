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
        { error && <p class='render-error'>{error}</p> }
        <form onSubmit={handleSubmit}  autoComplete='off'>
            <h4>Edit User Information</h4>
            <button onClick={unselect}>Go Back</button>
            <label for='name' >Name</label>
            <input type='text' name='name' onChange={handleOnDataChange} />
            <label for='email' >Email</label>
            <input type='text' name='email' onChange={handleOnDataChange} />
            <label for='password' >Password</label>
            <input type='password' name='password' onChange={handleOnDataChange} />
            <label for='confirm' >Password</label>
            <input type='password' name='confirm' onChange={handleOnDataChange} />
            <input type='submit'/>
        </form>
        </>
    )
}