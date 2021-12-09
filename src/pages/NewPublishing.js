import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { createPublishing } from '../api/service'
import onDataChange from '../utilities/onDataChange'
import shareSchema from '../api/models/schemas/shareSchema'

export default function NewPublishing({ profile }) {
    const navigate = useNavigate()

    const [addCollection, setAddCollection] = useState(false)
    const [error, setError] = useState(null)
    const [publishingData, setPublishingData] = useState({})
    const [collectionData, setCollectionData] = useState('')
    const [collections, setCollections] = useState((profile && profile.collections) || [])
    
    async function onNewPublishing(e) {
        try {
            e.preventDefault()
            const data = {...publishingData}
            data.shares = [{profile, percentage: 100}]
            setPublishingData(data)
            await createPublishing(publishingData)
            navigate(`/publishings/me`)
        } catch(e) {
            setError({ message: e.message })
        }
    }

    function onNewCollection(e) {
        e.preventDefault()
        setCollections([...collections, collectionData.collection])
        setCollectionData({ collection: '' })
    }

    return (
        <main>
            {error && <p>{error.message}</p>}
            {/*addCollection*/}
            <button onClick={() => {setAddCollection(!addCollection)}} >Want to add a new collection ?</button>
            {addCollection && (
                <form onSubmit={onNewCollection}>
                    <input type='text' name='collection' onChange={(e) => onDataChange(e, setCollectionData, collectionData)} value={collectionData.collection} required />
                    <input type='submit'/>
                </form>
            )}
            {/*addPublishing*/}
            {profile && 
            <form onSubmit={onNewPublishing}>
                <input type='text' name="name" onChange={(e) => onDataChange(e, setPublishingData, publishingData)} required />
                <select name="category" onChange={(e) => onDataChange(e, setPublishingData, publishingData)} defaultValue='Choose a category' required >
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
                <select name="series" onChange={(e) => onDataChange(e, setPublishingData, publishingData)} required >
                {collections.length ?
                    <>
                        <option>Choose a collection</option>
                        {
                            collections.map(collection => <option key={collection}>{collection}</option>)
                        }
                    </>
                    :
                    <option>No collection added</option>
                }
                </select>
                <input type="file" name="content" onChange={(e) => onDataChange(e, setPublishingData, publishingData)} required />
                <input type="submit" />
            </form>}
        </main>
    )
}