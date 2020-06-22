import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { getLocalizedPath } from '../../utils/funcs'

import germanyFlag from '../../assets/images/flags/de.png'
import englishFlag from '../../assets/images/flags/uk.png'

import './footer.css';

class StandardFooter extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const {
      intl: { messages, locale },
      location
    } = this.props

    const languages = [{
      label: messages.language_de,
      value: 'de',
      flag: germanyFlag
    }, {
      label: messages.language_en,
      value: 'en',
      flag: englishFlag
    }]

    let currentLanguage = ''
    let currentFlag =''
    Object.values(languages).map((i, j) => {
      if (i.value === locale) {
        currentLanguage = i.label
        currentFlag = i.flag
      }
    })
    return (
      <section className='footer'>
        <section className='uk-container uk-flex uk-flex-row uk-flex uk-flex-wrap uk-flex-top footer-content'>
          <div className="uk-text-left uk-width-1-1 uk-width-1-3@m">
            <ul className="footer-menu">
              <li className="menu-item"><Link to={getLocalizedPath('/imprint', locale)}>{messages.footer.links.imprint}</Link></li>
            </ul>
          </div>
          <div className='uk-text-center uk-width-1-1 uk-width-1-3@m'>
              <p className='copyright'>Copyright Pixofarm 2020</p>
          </div>
          <div className='language-selector uk-width-1-1 uk-width-1-3@m uk-flex uk-flex-right'>
            <div className='languages'>
                <div className='current-language'>
                  <div type='button' className='active language uk-flex'>
                    <span className='flag uk-flex'><img src={currentFlag} /></span>
                    <span className='label'>{locale}</span>
                  </div>
                </div>
                <div uk-dropdown='mode:click; pos: top-center' className='languages-holder'>
                  <div className='languages'>
                    {
                      Object.values(languages).map((i, j) => {
                        if (i.value !== locale) {
                          return (
                            <div className='language uk-flex uk-flex-row' key={`key-lang-${j}`} onClick={() => this.props.onLanguageChange(locale, location, i.value)}>
                              <span className='flag uk-flex'><img src={i.flag} /></span>
                              {i.label}
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>
              </div>
          </div>
        </section>
      </section>
    )
  }
}

StandardFooter.propTypes = {
  onLanguageChange: PropTypes.func,
}
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(StandardFooter))
