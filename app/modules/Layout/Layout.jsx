/**
 * app/modules/Layout/Layout.jsx
 */

import React from 'react';
import Navbar from '_modules/Navbar/NavbarContainer.jsx'
import PreLoader from '_modules/PreLoader/PreLoader.jsx'
import Sidebar from '_components/Sidebar/Sidebar.jsx'

export default class Layout extends React.Component {
  render() {
    return (
     <div className='layout'>
      <PreLoader />
     	<Navbar />
        	<div className=''>
        		<Sidebar />
        		<div className=''>
        			<div className='app-container'>
        				{this.props.children}
        			</div>
        		</div>
        	</div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: React.PropTypes.element.isRequired,
}