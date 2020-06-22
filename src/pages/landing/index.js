import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import homeimg from '../../assets/images/graph.png'

import { getLocalizedPath } from '../../utils/funcs'

import "./landing.css";

class Landing extends React.Component {
  
  redirectToLoginPage = () => {
    this.props.history.push({
      pathname: getLocalizedPath(`/login`, this.props.intl.locale),
    })
  }
  
  render() {
    const {
        intl: { messages, locale },
    } = this.props
    console.log('getLocalizedPath',getLocalizedPath('/login', locale))
    return (
      <section className='page homepage full-height single-screen with-bkg'>
        <section className="uk-container full-height small-pages left-background uk-height-1-1 uk-flex uk-flex-column uk-flex-center">
          <div className='uk-width-3-5@m uk-width-1-1'>
            <h1 className='tagline'>PixoFarm</h1>
            <p className='short-description'>
              Cupcake ipsum dolor sit amet gingerbread I love. Tiramisu pie I love powder. Fruitcake sweet roll powder cheesecake tootsie roll marzipan gummi bears tart brownie.
              Sesame snaps carrot cake macaroon I love gummi bears brownie. Cake I love donut sesame snaps jelly. I love tiramisu danish muffin toffee croissant.
            </p>
            <div className='button-holder uk-width-1-3@s uk-width-1-1'>
              <div className='btns' onClick={() => this.redirectToLoginPage()}>{messages.menu.login}</div>
            </div>
          </div>
          <div className='home-img'>
            <img src={homeimg}></img>
          </div>
        </section>
      </section>
    )
  }
}


const mapStateToProps = state => ({})

const mapDispatchToProp = dispatch => bindActionCreators({}, dispatch)

export default injectIntl(connect(mapStateToProps, mapDispatchToProp)(Landing))
