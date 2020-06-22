import React from 'react'
import './tooltip.css'

class PXTooltip extends React.Component { 
  render() {
    const {
        type,
        content
    } = this.props
    
    return (
      <div className={type} uk-dropdown='mode: click; animation: uk-animation-slide-top-small; pos: bottom-right;'>
          {content}
      </div>
    )
  }
}
export default PXTooltip