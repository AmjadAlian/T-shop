import React from 'react'
import Categories from '../categories/Categories.jsx'

export default function Home() {
    console.log(import.meta.env.VITE_API_URL);
    return (
        <>
        <Categories/>

        </>
    )
}
