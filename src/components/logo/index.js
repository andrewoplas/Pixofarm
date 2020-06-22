import React from 'react'
import { Image } from 'react-bootstrap'
import logo from '../../assets/images/pixo_logo.png'

const Logo = (props) => {
    return (
        <div className='logo-container'>
          <a href="/"><Image src={logo} className='logo'></Image></a>
        </div>

    )
}

export default Logo;