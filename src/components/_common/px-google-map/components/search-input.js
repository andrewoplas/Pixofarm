import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl";

class PXGoogleMapSearchInput extends React.Component {
  static propTypes = {
    position: PropTypes.object,
    onSearch: PropTypes.func,
  }
  
  constructor(props){
    super(props)
    
    this.state = {
      position: this.props.position || {}
    }
  }
  
  onChangeInput = async (e) => {
    const posArr = e.target.value.split(' ')
    const position = {
      latitude: posArr[0] ? parseFloat(posArr[0]) : '',
      longitude: posArr[1] ? parseFloat(posArr[1]) : '',
    }
    
    this.setState({
      position
    })
  }
  
  render() {
    const {
      position
    } = this.state
    
    return(
      <div className="search uk-flex">
        <input
          type="text"
          name="name"
          className="form-control"
          value={`${position.latitude} ${position.longitude}`}
          onChange={(e) => this.onChangeInput(e)}
        />
        <a className='over-map uk-flex uk-flex-center uk-flex-middle' type='button' onClick={() => this.props.onSearch(position)}><span uk-icon="search"></span></a>
      </div>
    )
  }
}

export default injectIntl(PXGoogleMapSearchInput)
