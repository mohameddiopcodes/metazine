import { useEffect } from "react"

export default function Home({ user }) {

    return (
        <main>
            {user && `Welcome ${user.name}`}
            <h1>Home</h1>
        </main>
    )
}