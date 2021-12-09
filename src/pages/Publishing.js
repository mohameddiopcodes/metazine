import './styles/Publishing.css'
import { useState } from "react"
import { useParams } from "react-router"
import { useEffect } from "react/cjs/react.development"

import { findPublishing } from '../api/service'
import PublishingSettings from '../components/PublishingSettings'

export default function Publishing() {
    const { id } =  useParams()
    const [publishing, setPublishing] = useState(null)
    const [selected, setSelected] = useState(1)

    useEffect(function() {
        id && (async () => setPublishing(await findPublishing(id)))()
    }, [])

    return (
        <main className='Publishing'>
            <button disabled={selected === 1} onClick={() => setSelected(1)}>View</button>
            <button disabled={selected === 2} onClick={() => setSelected(2)}>Settings</button>
            {publishing && <p>{publishing.name}</p>}
            {
                selected === 1 && publishing &&
                    <embed title={publishing.name} style={{display: 'block', height: '85vh', width: '40vw' ,margin: '2em auto'}} src={`data:application/pdf;base64,${publishing.content}#zoom=67`}>
                    </embed>
            }
            {
                selected === 2 && publishing &&
                    <PublishingSettings id={id} setSelectedParent={setSelected} />
            }
        </main>
    )
}