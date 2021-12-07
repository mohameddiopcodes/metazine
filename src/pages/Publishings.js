import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { allPublishings } from "../api/service"

export default function Publishings() {
    const [publishings, setPublishings] = useState([])

    useEffect(function() {
        (async () => setPublishings([...await allPublishings()])) ()
    }, [])

    return (
        <main>
           {
               publishings.map(p => p.content && 
                    <div>
                        <embed key={p._id} style={{display: 'block', margin: '3em auto'}} src={`data:application/pdf;base64,${p.content}`}>
                        </embed>
                        <Link key={p._id + 'link'} to={`/publishings/${p._id}`}>{p.name}</Link>
                    </div>
                )
           }
        </main>
    )
}