/**
 * app/modules/LocaleToggle/LocaleToggle.jsx
 *
 * Locale Component to change the language
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '_app/actions/languageActions'

const mapStateToProps = state => ({
  language: state.language,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  onClickLanguage(lang) {
    this.props.actions.setLocale(lang)
  }

  render() {
    return (
      <div>
        <span onClick={this.onClickLanguage.bind(this, 'en')}>en</span> | <span onClick={this.onClickLanguage.bind(this, 'fr')}>fr</span></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:true})(Home)
