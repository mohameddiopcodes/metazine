import { useState } from "react"
import { useParams } from "react-router"
import { useEffect } from "react/cjs/react.development"

import { findPublishing } from '../api/service'

export default function Publishing() {
    const { id } =  useParams()
    const [publishing, setPublishing] = useState(null)

    useEffect(function() {
        (async () => setPublishing(await findPublishing(id)))()
    }, [])

    return (
        <>
            {
                publishing &&
                    <embed title={publishing.name} style={{display: 'block', height: '85vh', width: '40vw' ,margin: '2em auto'}} src={`data:application/pdf;base64,${publishing.content}#zoom=67`}>
                    </embed>
            }
        </>
    )
}