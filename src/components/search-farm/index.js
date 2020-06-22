import React from 'react'
import { injectIntl } from 'react-intl'
import MapFrame from './map-frame'

import './index.css'

class PXSearchFarmComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// searchFarm: this.props.searchFarm,
		}
	}

	componentDidMount() {
		// console.log('PXSearchFarmComponent componentDidMount', this.props)
	}

	render() {
		const {
			intl: {
				messages
			},
		} = this.props
		return (
			<div className='form-holder'>
				<MapFrame
					groupsFarms={this.props.groupsFarms}
				/>
			</div>
		)
	}
}

export default injectIntl(PXSearchFarmComponent)