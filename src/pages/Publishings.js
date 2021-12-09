import './styles/Publishings.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { allPublishings } from "../api/service"

export default function Publishings() {
    const [publishings, setPublishings] = useState([])

    useEffect(function() {
        (async () => setPublishings([...await allPublishings()])) ()
    }, [])

    return (
        <main className='Publishings'>
           {
               publishings.map(p => p.content && 
                    <Link className='card' to={`/publishings/${p._id}`}>
                        <embed key={p._id} style={{display: 'block', margin: '3em auto'}} src={`data:application/pdf;base64,${p.content}`}>
                        </embed>
                        <Link key={p._id + 'link'} to={`/publishings/${p._id}`}>{p.name}</Link>
                    </Link>
                )
           }
            {publishings.length === 0 && 
                <Link to='/publishings/new' className='card' style={{justifyContent: 'center'}}>
                    <p className='plus'>+</p>
                </Link>
            }
        </main>
    )
}