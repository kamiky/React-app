/**
 * app/modules/Navbar/Navbar.jsx
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navbar from '_modules/Navbar/Navbar.jsx'

import './style.scss'

const mapStateToProps = state => ({
  metrics: state.metrics,
})

class NavbarContainer extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.metrics.bucket !== nextProps.metrics.bucket) {
      return true
    }
    return false
  }

  render() {
    return (
      <Navbar bucket={this.props.metrics.bucket}/>
    )
  }
}

NavbarContainer.propTypes = {
  metrics: React.PropTypes.object
}

export default connect(mapStateToProps, null, null, {pure:true})(NavbarContainer)