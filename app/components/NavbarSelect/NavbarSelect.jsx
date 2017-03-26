/**
 * app/components/NavbarSelect/NavbarSelect.jsx
 */

import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class NavbarSelect extends React.Component {
  render() {
    return (
        	<SelectField className='navbar-select'
			        	       value={1}
                       style={{width: 150}}
			        	       onChange={this.handleChange}>
	        	<MenuItem value={1} primaryText="Daryl" />
        	</SelectField>
    )
  }
}
