/**
 * app/modules/Dashboard/AppStatus.jsx
 *
 * Dashboard Block (container) Item
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import nested from 'nested-props'

import Wrapper from '_components/Dashboard/Wrapper.jsx';
import SquareContent from '_components/Dashboard/SquareContent.jsx';

const mapStateToProps = state => ({
  metrics: state.metrics,
})

class AppStatus extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.metrics.realTime !== nextProps.metrics.realTime
      || this.props.metrics.appSelected !== nextProps.metrics.appSelected) {
      return true
    }
    return false
  }

  render() {
    const {appSelected, serverSelected} = this.props.metrics
    const appData = nested.get(this.props, `metrics.realTime.${serverSelected}.${appSelected}`)
    if (!appData) return (
      <Wrapper square />
    )
    const {status, name, pid, restart_time, pm_uptime} = appData
    /* uptime ? wtf */
    return (
      <Wrapper square>
        <SquareContent  topLeft={{ text: `${name} (${pid})`, size: 1, color: 2 }}
                          center={[
                            { text: status === 'online' ? 'online' : 'offline', color: status === 'online' ? 1 : 'Error', size:3 },
                            { text: 'online for a month (fake)', color:3, size:1 },
                            { text:`${restart_time} restarts`, color:3, size:1 }
                            ]} />
      </Wrapper>
      )
  }
}

AppStatus.propTypes = {
  metrics: React.PropTypes.object
}

export default connect(mapStateToProps, null, null, {pure:true})(AppStatus)