/**
 * app/modules/Navbar/Navbar.jsx
 */

import React from 'react';
import Chip from 'material-ui/Chip';

import LocaleToggle from '_components/LocaleToggle/LocaleToggle.jsx'
import NavbarSelect from '_components/NavbarSelect/NavbarSelect.jsx'

import './style.scss'

export default class Navbar extends React.Component {
  render() {
    if (!this.props.bucket) return (
      <nav id='header'>
        <div className='left-corner'>
          <LocaleToggle/>
        </div>
      </nav>
    )

    return (
      <nav id='header'>
        <div className='left-corner'>
          <LocaleToggle/>
        </div>
        <div className='left-side'>
          <NavbarSelect buckets={[this.props.bucket.name]}/>
          <Chip className='chip'>{this.props.bucket.offer}</Chip>
          <Chip className='chip'>{this.props.bucket.public_id}</Chip>
        </div>
      </nav>
    )
  }
}
