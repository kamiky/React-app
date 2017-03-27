/**
 * app/modules/Socket
 *
 * Component used by App.jsx to connect redux store & socket.io
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
var socket = require('socket.io-client')('http://localhost:8080')

import * as actions from '_app/actions/metricsActions'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export class Socket extends React.Component {

  /* update Bucket & Servers informations every 30sec */
  getBucketInfo() {
      socket.send('keymetrics::bucketInfo')
      setTimeout(() => {
        this.getBucketInfo()
      }, 30 * 1000)
  }

  getMetaServers() {
      socket.send('keymetrics::metaServers')
      setTimeout(() => {
        this.getMetaServers()
      }, 30 * 1000)
  }

  componentDidMount() {

    socket.on('connect', () => {
      this.getMetaServers()
      this.getBucketInfo()
      // socket.send('keymetrics::run')
    })

    socket.on('keymetrics::bucketInfo', (data) => {
      // console.log('receive keymetrics::bucketInfo : ', data)
      this.props.actions.updateBucket(data)
    })

    socket.on('keymetrics::metaServers', (data) => {
      // console.log('receive keymetrics::metaServers : ', data)
      this.props.actions.updateServers(data)
    })

    socket.on('keymetrics::realTime', (data) => {
      // console.log('receive keymetrics::realTime : ', data)
      this.props.actions.updateRealTime(data)
    })

    socket.on('disconnect', function () {
      console.log('disconnect')
    })
  }

  render() {
    return (
        React.Children.only(this.props.children)
      )
  }
}

Socket.propTypes = {
  children: React.PropTypes.element.isRequired,
  actions: React.PropTypes.object
}

export default connect(null, mapDispatchToProps, null, {pure:true})(Socket)
