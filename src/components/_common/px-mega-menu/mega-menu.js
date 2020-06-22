import React from 'react'
import { injectIntl } from 'react-intl'

import './mega.css'

class PXMegaMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {

    } = this.props


    return (
        <div className='mega-menu uk-flex uk-flex-right'>
            <a className='mega-open' type='button'>More(8) <span uk-icon='icon: chevron-down'></span></a>
            <div className='mega-container' uk-dropdown='mode: click; pos: bottom-left; animation: uk-animation-slide-top-small'>
                <div className='uk-container'>
                    <div className='uk-flex uk-flex-wrap'>
                        <div className='main-items uk-width-2-3 uk-column-1-3'>
                            <ul className='uk-flex uk-flex-column main-items-list'>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Ambrosia</span>
                                        <span className='qty'>(156 Tons)</span>
                                    </a>
                                </li>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Golden</span>
                                        <span className='qty'>(25 Tons)</span>
                                    </a>
                                </li>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Pink Lady</span>
                                        <span className='qty'>(120 Tons)</span>
                                    </a>
                                </li>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Ambrosia</span>
                                        <span className='qty'>(156 Tons)</span>
                                    </a>
                                </li>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Golden</span>
                                        <span className='qty'>(25 Tons)</span>
                                    </a>
                                </li>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Pink Lady</span>
                                        <span className='qty'>(120 Tons)</span>
                                    </a>
                                </li>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Ambrosia</span>
                                        <span className='qty'>(156 Tons)</span>
                                    </a>
                                </li>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Golden</span>
                                        <span className='qty'>(25 Tons)</span>
                                    </a>
                                </li>
                                <li className='item uk-width-1-1'>            
                                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                        <span className='name'>Pink Lady</span>
                                        <span className='qty'>(120 Tons)</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='secondary-items uk-width-1-3 uk-flex uk-flex-right'>
                            <ul className='uk-flex uk-flex-column'>
                                <h4 className=''>
                                    Fruit type
                                </h4>
                                <li className='item uk-width-1-1'>Apple</li>
                                <li className='item uk-width-1-1'>Pear</li>
                                <li className='item uk-width-1-1'>Orange</li>
                                <li className='item uk-width-1-1'>Cherry</li>
                            </ul>
                        </div>
                        <div className='button-holder uk-width-1-1 uk-flex uk-flex-middle'>
                            <a className='btns uk-width-1-3@m uk-width-1-1'>Apply filters</a>
                            <a className='uk-width-1-6@m uk-width-1-1 uk-text-center'>Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default injectIntl(PXMegaMenu)