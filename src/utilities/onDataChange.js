export default function onDataChange(e, setter, prev) {
    if(e.target.files) return setter({...prev, [e.target.name]: e.target.files[0]})
    setter({...prev, [e.target.name]: e.target.value})
}