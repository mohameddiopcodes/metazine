import { useEffect, useState } from "react"
import { myPublishings } from "../api/service"

export default function MyPublishings() {
    const [publishings, setPublishings] = useState([])

    useEffect(function() {
        (async () => setPublishings([...await myPublishings()])) ()
    }, [])
    return (
        <main>
           {
               publishings.map(p => p.content && <embed src={`data:application/pdf;base64,${p.content}`}></embed>)
           }
        </main>
    )
}