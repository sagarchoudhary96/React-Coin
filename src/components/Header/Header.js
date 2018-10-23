import React from 'react'
import {Link} from 'react-router-dom'

import Search from '../Search/Search'

import './Header.css'

const Header = () => {
    return (
        <div className="Header">
            <Link to='/'>
                <img src='/images/logo.png' alt="logo" className="Header-logo"/>
            </Link>

            <Search/>>
        </div>
    )
}

export default Header