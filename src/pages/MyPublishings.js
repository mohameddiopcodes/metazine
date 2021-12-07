import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { myPublishings as Publishings } from "../api/service"

export default function MyPublishings() {
    const [myPublishings, setMyPublishings] = useState([])

    const { profileId } = useParams()

    useEffect(function() {
        (async () => setMyPublishings([...await Publishings(profileId)])) ()
    }, [])

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