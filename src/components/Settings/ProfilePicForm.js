import { useState } from "react"
import { updateProfile } from "../../api/service"

export default function ProfilePicForm({ unselect, handleOnDataChange, formData, profile, setProfile }) {
    const [ error, setError ] = useState('')
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if(formData.password !== formData.confirm) throw new Error("The passwords don't match")
            const data = {...formData}
            delete data.confirm
            setProfile(await updateProfile(profile._id, data))
            unselect(null, 'Profile succesfully updated')
        } catch(e) {
            setError(e.message)
        }
    }

    return (
        <>
        { error && <p class='render-error'>{error}</p> }
        <form onSubmit={handleSubmit}  autoComplete='off'>
            <h4>Edit Profile Picture</h4>
            <button onClick={unselect}>Go Back</button>
            <label for='image' >Upload Image</label>
            <input type='file' name='image' onChange={handleOnDataChange} />
            <label for='password' >Enter Password</label>
            <input type='password' name='password' onChange={handleOnDataChange} />
            <label for='confirm' >Confirm Password</label>
            <input type='password' name='confirm' onChange={handleOnDataChange} />
            <input type='submit'/>
        </form>
        </>
    )
}