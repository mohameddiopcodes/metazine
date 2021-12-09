import { useState } from "react";
import PasswordForm from "../components/Settings/PasswordForm";
import ProfileInfoForm from "../components/Settings/ProfileInfoForm";
import ProfilePicForm from "../components/Settings/ProfilePicForm";
import UserInfoForm from "../components/Settings/UserInfoForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import onDataChange from "../utilities/onDataChange";

export default function Settings({ profile, setProfile }) {
    const [selected, setSelected] = useState(null)
    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState('')

    function handleSelected(e) {
        const num = parseInt(e.target.title)
        setMessage('')
        setSelected(num)
    }

    function unselect(e, m = message) {
        setSelected(null)
        setFormData({})
        if(m) setMessage(m)
    }

    function handleOnDataChange(e) {
        onDataChange(e, setFormData, formData)
    }
    return (
            <>
            { message && <p>{message}</p>}
            {
                !selected && 
                <div style={{maxWidth: '350px', margin: '2em auto', textAlign: 'left'}}>
                    <h4>User Settings</h4>
                    <button style={{display: 'block'}} title='1' onClick={handleSelected}>user information</button>
                    <button style={{display: 'block'}} title='2' onClick={handleSelected}>password</button>
                    <button style={{display: 'block'}} title='5' onClick={handleSelected}>delete account</button>
                    <h4>Profile Settings</h4>
                    <button style={{display: 'block'}} title='3' onClick={handleSelected}>profile information</button>
                    <button style={{display: 'block'}} title='4' onClick={handleSelected}>profile picture</button>
                    <button style={{display: 'block'}} title='6' onClick={handleSelected}>delete profile</button>
                </div>
            }
            { selected === 1 && <UserInfoForm unselect={unselect} handleOnDataChange={handleOnDataChange} setProfile={setProfile} formData={formData} /> }
            { selected === 2 && <PasswordForm unselect={unselect} handleOnDataChange={handleOnDataChange} formData={formData} /> }
            { selected === 3 && <ProfileInfoForm unselect={unselect} handleOnDataChange={handleOnDataChange} formData={formData} profile={profile} setProfile={setProfile} /> }
            { selected === 4 && <ProfilePicForm unselect={unselect} handleOnDataChange={handleOnDataChange} formData={formData} profile={profile} setProfile={setProfile} /> }
            { selected === 5 && <DeleteConfirmation entity='account' unselect={unselect} /> }
            { selected === 6 && <DeleteConfirmation entity='profile' unselect={unselect} /> }
            </>
            
    )
}