import React from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import ComponentCorporateDetails from '../../components/corporate-details/componentCorporateDetails'
import * as actionsFarm from "../../redux/farm/actions"
import * as actionsOrchard from "../../redux/orchard/actions"
import {fruitVarieties_data, groupsFarms_data} from "../../utils/constants"

class PageCorporateDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
		}
	}

	componentDidMount() {
		let groupsFarmsLoaded = (this.props.groupsFarms && this.props.groupsFarms.data && this.props.groupsFarms.data.length > 0)
		let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
		if (!groupsFarmsLoaded) this.props.groupsFarmsGet()
		if (!fruitVarietiesLoaded) this.props.fruitVarietiesGet()
		// console.log('PageCorporateDetails componentDidMount', groupsFarmsLoaded && fruitVarietiesLoaded)
		this.setState({
			loading: !groupsFarmsLoaded && !fruitVarietiesLoaded,
		})
	}
	componentDidUpdate(prevProps) {
		if (prevProps && prevProps.groupsFarms && prevProps.groupsFarms.loading && !this.props.groupsFarms.loading) {
			this.onDataLoaded()
		}
		if (prevProps && prevProps.fruitVarieties && prevProps.fruitVarieties.loading && !this.props.fruitVarieties.loading) {
			this.onDataLoaded()
		}
	}
	onDataLoaded = () => {
		let groupsFarmsLoaded = (this.props.groupsFarms && this.props.groupsFarms.data && this.props.groupsFarms.data.length > 0)
		let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
		if (groupsFarmsLoaded && fruitVarietiesLoaded) {
			// console.log('PageCorporateDetails onDataLoaded')
			this.setState({
				loading: false,
			})
		}
	}
	render() {
		const {
			intl: {
				messages, locale
			},
		} = this.props
		const {
			loading
		} = this.state
		// console.log('PageCorporateDetails render', this.props, this.state)
		if (loading) return 'Loading...'
		return (
			<section className="forms-container page with-bkg">
				<section className='dark-bg'>
					<section className='full-height small-pages uk-container uk-height-1-1 uk-flex uk-flex-column'>
						<div className='uk-width-1-1'>
							<ComponentCorporateDetails
								groupsFarms={this.props.groupsFarms.data}
								fruitVarieties={this.props.fruitVarieties.data}
								// groupsFarms={groupsFarms_data}
								// fruitVarieties={fruitVarieties_data}
							/>
						</div>
					</section>
				</section>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		groupsFarms: state.farm.groupsFarms,
		fruitVarieties: state.orchard.fruitVarieties
	}
}

const mapDispatchToProps = dispatch => ({
	groupsFarmsGet: data => dispatch(actionsFarm.groupsFarmsGet(data)),
	fruitVarietiesGet: data => dispatch(actionsOrchard.fruitVarietiesGet(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PageCorporateDetails)))