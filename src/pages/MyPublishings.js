import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { myPublishings as Publishings } from "../api/service"

export default function MyPublishings({ profile }) {
    const [myPublishings, setMyPublishings] = useState([])

    useEffect(function() {
        profile && (async () => setMyPublishings([...await Publishings(profile._id)])) ()
    }, [profile])

    return (
        <main>
           {
               myPublishings.map(p => p.content && 
                    <div>
                        <embed key={p._id} style={{display: 'block', margin: '3em auto'}} src={`data:application/pdf;base64,${p.content}`}>
                        </embed>
                        <Link to={`/publishings/${p._id}`}>{p.name}</Link>
                    </div>
                )
           }
        </main>
    )
}