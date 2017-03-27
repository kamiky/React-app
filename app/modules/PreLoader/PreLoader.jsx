/**
 * app/modules/PreLoader/PreLoader.jsx
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from 'material-ui/CircularProgress';

import './style.scss'

const mapStateToProps = state => ({
  metrics: state.metrics,
})

class PreLoader extends React.Component {
  render() {
    return (
     <div className='pre-loader'>
        <div className='vhelper'></div>
        <CircularProgress size={80} className='progress' color='#ff4081'/>
      </div>
    )
  }
}


PreLoader.propTypes = {
  metrics: React.PropTypes.object
}

export default connect(mapStateToProps, null, null, {pure:true})(PreLoader)