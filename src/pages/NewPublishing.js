import { useState } from 'react'

import { createPublishing } from '../api/service'
import onDataChange from '../utilities/onDataChange'

export default function NewPublishing({ profile }) {
    const [addCollection, setAddCollection] = useState(false)
    const [publishingData, setPublishingData] = useState({})
    const [collectionData, setCollectionData] = useState('')
    const [collections, setCollections] = useState(profile.collections || [])

    function onNewPublishing() {
        console.log(publishingData)
    }

    function onNewCollection(e) {
        e.preventDefault()
        setCollections([...collections, collectionData.collection])
        setCollectionData({ collection: '' })
    }

    return (
        <main>
            {/*addCollection*/}
            <button onClick={() => {setAddCollection(!addCollection)}} >Want to add a new collection ?</button>
            {addCollection && (
                <form onSubmit={onNewCollection}>
                    <input type='text' name='collection' onChange={(e) => onDataChange(e, setCollectionData, collectionData)} value={collectionData.collection} required />
                    <input type='submit'/>
                </form>
            )}
            {/*addPublishing*/}
            <form onSubmit={onNewPublishing}>
                <input type='text' name="name" onChange={(e) => onDataChange(e, setPublishingData, publishingData)} required />
                <select name="category" onChange={(e) => onDataChange(e, setPublishingData, publishingData)} required >
                        <option disabled selected>Choose a category</option>
                        <option>Finance</option>
                        <option>Fashion</option>
                        <option>Art</option>
                        <option>Technology</option>
                        <option>Sport</option>
                </select>
                <select name="collection" onChange={(e) => onDataChange(e, setPublishingData, publishingData)} required >
                {collections.length ?
                    <>
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
            </form>
        </main>
    )
}