/**
 * app/modules/Dashboard/AppList.jsx
 *
 * Dashboard Block (container) Item
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import nested from 'nested-props'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Wrapper from '_components/Dashboard/Wrapper.jsx';
import SquareContent from '_components/Dashboard/SquareContent.jsx';
import TableItem from '_components/Dashboard/Table.jsx';

import * as actions from '_app/actions/metricsActions'

const mapStateToProps = state => ({
  metrics: state.metrics,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

class AppList extends React.Component {

  constructor() {
    super()

    this.onSelect = this.onSelect.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.metrics.realTime !== nextProps.metrics.realTime
        || this.props.metrics.appSelected !== nextProps.metrics.appSelected) {
      return true
    }
    return false
  }

  onSelect(app) {
    this.props.actions.selectApp(app.name)
  }

  render() {
    const {appSelected, serverSelected} = this.props.metrics
    const apps = nested.get(this.props, `metrics.realTime.${serverSelected}`)
    return (
      <Wrapper noPaddingBottom paddingTop >
        <div>
          <SquareContent  topLeft={{text: `Applications`}} />
          <TableItem apps={apps} selected={appSelected} onSelect={this.onSelect}/>
        </div>
      </Wrapper>
      )
  }
}

AppList.propTypes = {
  metrics: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:true})(AppList)