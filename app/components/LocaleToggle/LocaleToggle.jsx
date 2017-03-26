/**
 * app/modules/LocaleToggle/LocaleToggle.jsx
 *
 * Locale Component to change the language
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '_app/actions/languageActions'

import './style.scss'

const mapStateToProps = state => ({
  language: state.language,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export class LocaleToggle extends React.Component {

  constructor(props) {
    super(props);
  }

  onClickLanguage(lang) {
    this.props.actions.setLocale(lang)
  }

  render() {
    const { locale } = this.props.language
    var classNames = 'localeToggle'
    if (this.props.left) classNames += ' left'
    return (
      <div className={classNames}>
        <span className={locale === 'en' ? 'color1' : ''} onClick={this.onClickLanguage.bind(this, 'en')}>en</span>
        <span> | </span>
        <span className={locale === 'fr' ? 'color1' : ''} onClick={this.onClickLanguage.bind(this, 'fr')}>fr</span>
      </div>
    )
  }
}

LocaleToggle.propTypes = {
  left: React.PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:true})(LocaleToggle)
