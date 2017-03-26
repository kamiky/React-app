/**
 * app/modules/Dashboard/ServerInfo.jsx
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

class ServerInfo extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.metrics.servers !== nextProps.metrics.servers) {
      return true
    }
    return false
  }

  render() {
    var serverData
    const {serverSelected, servers} = this.props.metrics
    for (var i = servers.length - 1; i >= 0; --i) {
      if (servers[i].name === serverSelected) {
        serverData = servers[i]
        break
      }
    }
    if (!serverData) return (
      <Wrapper />
    )
    const {name, ip, active, cpus, ram} = serverData
    return (
      <Wrapper >
        <SquareContent  topLeft={[{text: `Server: ${name}`}, {text: ip}]}
                        center={{text: active ? 'online' : 'offline', size: 3, color: active ? 1 : 'Error'}}
                        bottomLeft={{text: `${cpus} CPU`}}
                        bottomRight={{text: ram ? `ram : ${ram}` : ''}}
                        />
      </Wrapper>
      )
  }
}

ServerInfo.propTypes = {
  metrics: React.PropTypes.object
}

export default connect(mapStateToProps, null, null, {pure:true})(ServerInfo)