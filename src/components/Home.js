import React from "react";
import { Link } from 'react-router-dom'

export default function Home () {
    return (
        <div className='container'>
            <section className='order'>
            <h1>Your favorite food delivered while coding</h1>
            <Link to='/pizza'>
                <button>Pizza?</button>
            </Link>
            </section>
        </div>
    )
}