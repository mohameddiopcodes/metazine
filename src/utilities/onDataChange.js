export default function onDataChange(e, setter, prev) {
    if(e.target.files) {
        e.target.files[0].arrayBuffer()
            .then(data => {
                setter({...prev, [e.target.name]: Buffer.from(data).toString('base64')})
            })
            .catch(e => console.log(e))
        return
    }
    setter({...prev, [e.target.name]: e.target.value})
}