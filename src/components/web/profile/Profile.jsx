import React, { useContext } from 'react'
import './profile.css'
import { UserContext } from '../context/UserContext.jsx'
import { Link, Outlet } from 'react-router-dom';
export default function Profile() {

    let {  loading } = useContext(UserContext);

    if (loading) {
        return <h2>... loading</h2>
    }
    return (
        <>
            <aside className='profile bg-dark overflow-hidden'>
                <div className="profile-links">
                    <nav className='bg-dark'>
                        
                        <Link to=''>Profile</Link>
                        <Link to='contact'>Contact</Link>
                        <Link to='orders'>Orders</Link>
                    </nav>
                </div>
                <div className="user-data w-100">
                    <Outlet />
                </div>
            </aside>
        </>
    )
}
