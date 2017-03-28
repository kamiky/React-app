/**
 * app/modules/PreLoader/PreLoader.jsx
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from 'material-ui/CircularProgress';

import coreService from '_app/services/coreService'

import './style.scss'

const mapStateToProps = state => ({
  metrics: state.metrics,
})

class PreLoader extends React.Component {
  render() {
    var classNames = 'pre-loader fade'
    if (coreService.isReady(this.props.metrics)) {
      classNames += ' hide'
    }
    return (
     <div className={classNames}>
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