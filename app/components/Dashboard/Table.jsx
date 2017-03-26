/**
 * app/components/Dashboard/Table.jsx
 *
 * Dashboard Table Item
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class TableItem extends React.Component {

  render() {
    const {apps, selected} = this.props

    const styleColumn = {
      width: '50px',
      textAlign: 'center',
      paddingLeft: '0px',
      paddingRight: '0px'
    }

    if (!apps) {
      return null
    }

    return (
      <Table selectable={false}>
    <TableHeader className='dashboard-table' displaySelectAll={false} adjustForCheckbox={false} >
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn style={styleColumn}>Cpu</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} showRowHover={true}>
      {
        Object.keys(apps).map((key, index) => {
          const app = apps[key]
          return (
            <TableRow onTouchTap={this.props.onSelect.bind(this, app)} key={`app-${index}`} hovered={selected === app.name ? true : false}>
              <TableRowColumn>{app.name}</TableRowColumn>
              <TableRowColumn style={styleColumn}>{app.cpu}%</TableRowColumn>
            </TableRow>
          )
        })
      }
    </TableBody>
  </Table>
      )
  }
}

TableItem.propTypes = {
  apps: React.PropTypes.object,
  selected: React.PropTypes.string,
  onSelect: React.PropTypes.func
}