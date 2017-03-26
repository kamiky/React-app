/**
 * app/components/Dashboard/Wrapper.jsx
 *
 * Dashboard Block item
 */

import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import './style.scss'

export default class Wrapper extends React.Component {

  renderSquare() {
    return (
      <div className='dashboard-wrapper square-shape'>
        <div className='dummy'></div>
        <div className='element'>
        {this.props.children ? this.props.children : ''}
        </div>
     </div>
     )
  }

  render() {
    const { content, square, half, noPaddingBottom, paddingTop } = this.props

    if (square) {
      return this.renderSquare()
    }
    var classNames = 'dashboard-wrapper default-shape'
    if (noPaddingBottom) classNames += ' noPaddingBottom'
    if (paddingTop) classNames += ' paddingTop'

    return (
     <div className={classNames}>
      <div className='element'>
        {this.props.children ? this.props.children : ''}
      </div>
     </div>
    )
  }
}

Wrapper.propTypes = {
  children: React.PropTypes.element,
}