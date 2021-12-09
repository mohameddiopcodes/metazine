import { useState } from "react"
import { updateToken, updateUser } from "../../api/service"

export default function PasswordForm({ unselect, handleOnDataChange, formData }) {
    const [ error, setError ] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if(formData.password !== formData.confirm) throw new Error("The passwords don't match")
            const data = {...formData}
            delete data.confirm
            updateToken( (await updateUser(data)).token )
            unselect(null, 'Password succesfully changed')
        } catch(e) {
            setError(e.message)
        }
    }

    return (
        <>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} >
            <h4>Edit Password</h4>
            <button onClick={unselect}>Go Back</button>
            <input type='password' name='prevPassword' onChange={handleOnDataChange} />
            <input type='password' name='password' onChange={handleOnDataChange} />
            <input type='password' name='confirm' onChange={handleOnDataChange} />
            <input type='submit'/>
        </form>
        </>
    )
}