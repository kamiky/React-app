/**
 * app/modules/LanguageProvider
 *
 * Component used by App.jsx to connect redux store & i18n
 */

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IntlProvider } from 'react-intl';
import messages from '_app/translations'

const mapStateToProps = state => ({
  locale: state.language.locale,
})

export class LanguageProvider extends React.Component {

  render() {
    return (
     <IntlProvider  key={this.props.locale}
                    locale={this.props.locale}
                    messages={messages[this.props.locale]}>
        {React.Children.only(this.props.children)}
      </IntlProvider>
      )
  }
}

LanguageProvider.propTypes = {
  locale: React.PropTypes.string,
  children: React.PropTypes.element.isRequired,
}

export default connect(mapStateToProps, null, null, {pure:true})(LanguageProvider)
