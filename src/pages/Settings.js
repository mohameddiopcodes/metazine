import { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
    const [userInfoForm, setUserInfoForm] = useState(false)
    const [passwordForm, setPasswordForm] = useState(false)
    const [profileInfoForm, setProfileInfoForm] = useState(false)
    const [profilePicForm, setProfilePicForm] = useState(false)
    const form = !userInfoForm && !passwordForm && !profileInfoForm && !profilePicForm
    return (
            <>
            {
                !form && 
                <div style={{maxWidth: '350px', margin: '2em auto', textAlign: 'left'}}>
                    <h4>User Settings</h4>
                    <button style={{display: 'block'}}>update user information</button>
                    <button style={{display: 'block'}}>update password</button>
                    <h4>Profile Settings</h4>
                    <button style={{display: 'block'}}>update profile information</button>
                    <button style={{display: 'block'}}>update profile image</button>
                </div>
            }
            {
                userInfoForm && 
                <form>
                    <input type='text' name='name'/>
                    <input type='text' name='email'/>
                    <input type='submit'/>
                </form>
            }
            {
                passwordForm && 
                <form>
                    <input type='password' name='prevPassword'/>
                    <input type='password' name='password'/>
                    <input type='password' name='confirm'/>
                    <input type='submit'/>
                </form>
            }
            {
                profileInfoForm && 
                <form>
                    <input type='text' name='name'/>
                    <input type='submit'/>
                </form>
            }
            {
                profilePicForm && 
                <form>
                    <input type='file' name='image'/>
                    <input type='submit'/>
                </form>
            }
            </>
            
    )
}