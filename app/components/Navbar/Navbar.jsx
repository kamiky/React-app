/**
 * app/components/Navbar/Navbar.jsx
 */

import React from 'react';
import Chip from 'material-ui/Chip';

import LocaleToggle from '_components/LocaleToggle/LocaleToggle.jsx'
import NavbarSelect from '_components/NavbarSelect/NavbarSelect.jsx'

import './style.scss'

export default class Navbar extends React.Component {
  render() {
    return (
      <nav id='header'>
      	<div className='left-corner'>
        	<LocaleToggle/>
        </div>
        <div className='left-side'>
        	<NavbarSelect />
        	<Chip className='chip'>Offer</Chip>
        	<Chip className='chip'>public_id</Chip>
        </div>
      </nav>
    )
  }
}
