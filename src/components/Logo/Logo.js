import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
		    <Tilt className=' Tilt br2 shadow-2' style={{width: 150}}>
		      <div style={{ height: 150, width: 150 }}>
		        <img alt='logo' style={{paddingTop: '25px'}} src={brain}/>
		      </div>
		    </Tilt>
		</div>
	);
}

export default Logo;