/**
 * app/modules/Dashboard/AppMem.jsx
 *
 * Dashboard Block (container) Item
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import nested from 'nested-props'

import mathService from '_app/services/mathService'

import Wrapper from '_components/Dashboard/Wrapper.jsx';
import SquareContent from '_components/Dashboard/SquareContent.jsx';

const mapStateToProps = state => ({
  metrics: state.metrics,
})

class AppMem extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.metrics.realTime !== nextProps.metrics.realTime
      || this.props.metrics.appSelected !== nextProps.metrics.appSelected) {
      return true
    }
    return false
  }

  render() {
    const {appSelected, serverSelected} = this.props.metrics
    const mem = nested.get(this.props, `metrics.realTime.${serverSelected}.apps.${appSelected}.memory`)
    const convertedMem = mathService.bytesToSizeStr(mem)
    return (
      <Wrapper square>
        <SquareContent  topLeft={{ text: 'memory', size: 1, color: 3 }}
                        center={{ text:convertedMem, color:1, size:4 }} />
      </Wrapper>
      )
  }
}

AppMem.propTypes = {
  metrics: React.PropTypes.object
}

export default connect(mapStateToProps, null, null, {pure:true})(AppMem)