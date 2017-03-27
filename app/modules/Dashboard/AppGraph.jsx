/**
 * app/modules/Dashboard/AppGraph.jsx
 *
 * Dashboard Block (container) Item
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import nested from 'nested-props'
import pubsub from 'pubsub-js'

import mathService from '_app/services/mathService'

import Wrapper from '_components/Dashboard/Wrapper.jsx';
import LineGraph from '_components/Dashboard/LineGraph.jsx';
import SquareContent from '_components/Dashboard/SquareContent.jsx';

const mapStateToProps = state => ({
  metrics: state.metrics,
})

class AppGraph extends React.Component {

  constructor() {
    super()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.metrics.realTime !== nextProps.metrics.realTime) {
      return true
    }

    if (this.props.metrics.appSelected !== nextProps.metrics.appSelected) {
      pubsub.publish('lineGraph::reset');
      return true
    }
    return false
  }

  render() {
    const {appSelected, serverSelected} = this.props.metrics
    const cpu = nested.get(this.props, `metrics.realTime.${serverSelected}.apps.${appSelected}.cpu`)
    const mem = nested.get(this.props, `metrics.realTime.${serverSelected}.apps.${appSelected}.memory`)
    const convertedMem = mathService.bytesToSize(mem)
    return (
      <Wrapper >
        <div>
        <SquareContent  topRight={[{ text: 'cpu', size: 1, color: 1 }, { text: 'mem', size: 1, color: 2 }]} />
        <LineGraph cpu={cpu}
                   mem={convertedMem}/>
        </div>
      </Wrapper>
      )
  }
}

AppGraph.propTypes = {
  metrics: React.PropTypes.object
}

export default connect(mapStateToProps, null, null, {pure:true})(AppGraph)