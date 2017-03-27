/**
 * app/components/NavbarSelect/NavbarSelect.jsx
 */

import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class NavbarSelect extends React.Component {

  onChange(e, data) {
    console.log('onChange', e, data)
  }

  render() {
    return (
        	<SelectField className='navbar-select'
			        	       value={0}
                       style={{width: 150}}
			        	       onChange={this.onChange}>
            {this.props.buckets.map((bucketName, index) => {
              return (
                <MenuItem key={`bucket-${index}`} value={index} primaryText={bucketName} />
                )
            })}
        	</SelectField>
    )
  }
}
