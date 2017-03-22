/**
 * app/modules/Layout/Layout.jsx
 */

import React from 'react';
import LocaleToggle from '_modules/LocaleToggle/LocaleToggle.jsx'

export default class Layout extends React.Component {
  render() {
    return (
     <div className='layout'>
        <LocaleToggle />
        {this.props.children}
      </div>
    )
  }
}
