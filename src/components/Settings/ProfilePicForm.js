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
        { error && <p>{error}</p> }
        <form onSubmit={handleSubmit} >
            <h4>Edit Profile Picture</h4>
            <button onClick={unselect}>Go Back</button>
            <input type='file' name='image' onChange={handleOnDataChange} />
            <input type='password' name='password' onChange={handleOnDataChange} />
            <input type='password' name='confirm' onChange={handleOnDataChange} />
            <input type='submit'/>
        </form>
        </>
    )
}