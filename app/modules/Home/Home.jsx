/**
 * app/modules/Home/Home.jsx
 *
 * HomePage Component
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './home.scss'

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick() {
    this.props.actions.update()
  }

  render() {
    const { test } = this.props
    return (
     <div style={{textAlign: 'center'}}>
        <h1 onClick={this.onClick.bind(this)}>
          <FormattedMessage {...messages.welcome} />
        </h1>

      </div>);
  }
}
