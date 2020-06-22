import React from 'react'
import Logo  from '../../components/logo'
import PXMainMenu from '../menu/menu'

import './style.css'

class StandardHeader extends React.Component {
  render() {
    const {
      darkerMenu,
    } = this.props

    return (
      <section className={`header ${darkerMenu ? 'transparent' : ''}`}>
        <section className='uk-container uk-flex uk-flex-row uk-flex uk-flex-middle header-content'>
            <div className='uk-width-1-3@m uk-text-left'>
              <Logo />
            </div>
            <div className='uk-width-2-3@m uk-text-right'>
              <PXMainMenu />
            </div>
        </section>
      </section>
    )
  }
}
export default (StandardHeader)
