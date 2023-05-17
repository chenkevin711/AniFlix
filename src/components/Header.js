import React from 'react'
import "../assets/fonts/BebasNeue.otf"
import logo from '../assets/images/AniFlix.png'

function Header() {
	return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
			<img src={logo} alt="Anime Image"/>
		</div>
	)
}

export default Header