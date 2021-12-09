import './styles/Publishings.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { myPublishings as Publishings } from "../api/service"

export default function MyPublishings({ profile }) {
    const [myPublishings, setMyPublishings] = useState([])

    useEffect(function() {
        try {
            profile && profile._id && (async () => setMyPublishings([...await Publishings(profile._id)])) ()
        } catch (e) {
            setMyPublishings([])
        }
    }, [profile])

    return (
        <main className='Publishings'>
           {
               myPublishings.map(p => p.content && 
                    <Link className='card' to={`/publishings/${p._id}`}>
                        <embed key={p._id} style={{display: 'block', margin: '3em auto'}} src={`data:application/pdf;base64,${p.content}`}>
                        </embed>
                        <Link to={`/publishings/${p._id}`}>{p.name}</Link>
                    </Link>
                )
           }
           {myPublishings.length === 0 && 
                <Link to='/publishings/new' className='card' style={{justifyContent: 'center'}}>
                    <p className='plus'>+</p>
                </Link>
            }
        </main>
    )
}