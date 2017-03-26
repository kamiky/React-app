/**
 * app/components/Dashboard/SquareContent.jsx
 *
 * Dashboard Block item
 */

import React from 'react';

export default class SquareContent extends React.Component {

  constructor(props) {
    super(props)

    this.renderContent = this.renderContent.bind(this)
    this.renderMultiLine = this.renderMultiLine.bind(this)
  }

  getClassNames(classNames, params) {
    if (params.size) {
      classNames += ` size${params.size}`
    }

    if (params.color) {
      classNames += ` color${params.color}`
    }

    return classNames
  }

  renderMultiLine(side, params) {
    var classNames
    return (
        <div className={side}>
         {params.map((el, index) => {
          classNames = this.getClassNames('', params[index])
          return (<div className={classNames} key={`el-${index}`}>{el.text || ''}</div>)
         })} 
        </div>
        )
  }

  renderContent(side) {
    const params = this.props[side]
    if (!params) return ''
    var classNames

    if (Array.isArray(params)) {
      if (side === 'center') {
        return (
          <div className='center-container'>
            <div className='vhelper'></div>
            {this.renderMultiLine(side, params)}
          </div>
        )
      }
      return this.renderMultiLine(side, params)
    }

    classNames = this.getClassNames(side, params)

    if (side === 'center') {
      return (<div className='center-container'>
        <div className='vhelper'></div>
        <div className={classNames}>{params.text || ''}</div>
        </div>)
    }

    return (
      <div className={classNames}>{params.text || ''}</div>
      )
  }

  render() {

    return (
     <div>
      {this.renderContent('topLeft')}
      {this.renderContent('center')}
      {this.renderContent('bottomLeft')}
      {this.renderContent('bottomRight')}
      {this.renderContent('topRight')}
     </div>
    )
  }
}
