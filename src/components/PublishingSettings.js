import { useState } from "react"
import { updatePublishing } from "../api/service"
import onDataChange from "../utilities/onDataChange"
import DeleteConfirmation from "./DeleteConfirmation"

export default function PublishingSettings({ id, setSelectedParent }) {
    const [error, setError] = useState('')
    const [selected, setSelected] = useState(1)
    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState('')

    function unselect(e, m = message) {
        setSelected(1)
        setFormData({})
        if(m) setMessage(m)
    }

    function handleOnDataChange(e) {
        onDataChange(e, setFormData, formData)
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            if(formData.password !== formData.confirm) throw new Error("The passwords don't match")
            const data = {...formData}
            delete data.password
            delete data.confirm
            await updatePublishing(id, formData)
            setSelectedParent(1)
        } catch(e) {
            setError(e.message)
        }
    }

    return (
        <div>
            {error && <p>{error}</p>}
            <button disabled={selected === 1} onClick={() => setSelected(1)} >change information</button>
            <button disabled={selected === 2} onClick={() => setSelected(2)} >change content</button>
            <button disabled={selected === 3} onClick={() => setSelected(3)} >delete</button>
            {selected === 1 && 
                <form onSubmit={handleSubmit} >
                    <input type='text' name='name' onChange={handleOnDataChange} />
                    <select name="category" defaultValue='Choose a category' onChange={handleOnDataChange} >
                            <option disabled>Choose a category</option>
                            <option>Art</option>
                            <option>Finance</option>
                            <option>Literature</option>
                            <option>Science</option>
                            <option>Science Fiction</option>
                            <option>Spirituality</option>
                            <option>Health</option>
                            <option>Comedy</option>
                            <option>Romance</option>
                            <option>Technology</option>
                            <option>Fashion</option>
                            <option>Sport</option>
                    </select>
                    <input type='password' name='password' onChange={handleOnDataChange} />
                    <input type='password' name='confirm' onChange={handleOnDataChange} />
                    <input type='submit' />
                </form>
            }
            {selected === 2 && 
                <form onSubmit={handleSubmit} >
                    <input type='file' name='content' onChange={handleOnDataChange} />
                    <input type='password' name='password' onChange={handleOnDataChange} />
                    <input type='password' name='confirm' onChange={handleOnDataChange} />
                    <input type='submit' />
                </form>
            }
            {selected === 3 && 
                <DeleteConfirmation entity='publishing' unselect={unselect} handleOnDataChange={handleOnDataChange} formData={formData} publishingId={id} />
            }
        </div>
    )
}