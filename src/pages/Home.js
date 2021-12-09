import './styles/Home.css'
import { useEffect } from "react"
import { Link } from 'react-router-dom'

export default function Home({ user }) {

    return (
        <main className='Home'>
            <div className='home-thumbnail'>
                <div className='overlay'></div>
                <div>
                    <h2>Welcome to Metazine</h2>
                    <p>Publish articles, documentation, or anything you think people might like</p>
                </div>
                <div>
                    <Link className='thumbnail-btn' to='/auth' >Create an account</Link>
                    <Link className='thumbnail-link'  to='/auth' >Already have an account ?</Link>
                </div>
                <Link className='below' to='/auth'>🌘<p>see more</p><p>–</p></Link>
            </div>
            <div id='actions'>
                <div className='action-card'>
                    <p className='emoji'>👨🏽</p>
                    <p>Create publishings</p>
                </div>
                <div className='action-card'>
                    <p className='emoji'>👨🏾‍💻</p>
                    <p>Explore your interests</p>
                </div>
                <div className='action-card'>
                    <p className='emoji'>🕵️</p>
                    <p>Stay Informed</p>
                </div>
            </div>
        </main>
    )
}