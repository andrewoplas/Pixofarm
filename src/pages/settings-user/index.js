import React from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PXSettingsUserForm from '../../components/settings-user'
import * as actionsUser from "../../redux/user/actions"

class PXSettingsUser extends React.Component {
	componentDidMount() {
		this.props.settingsUserGet()
	}
	handleSubmit = async (formValues) => {
		this.props.settingsUserUpdate(formValues)
	}
	render() {
		const {
			intl: {
				messages, locale
			},
		} = this.props
		return (
			<section className="forms-container page with-bkg">
				<section className='new-user full-height small-pages uk-container uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
					<div className='uk-width-2-3@m uk-width-1-1'>
						<PXSettingsUserForm
							onSubmit={this.handleSubmit}
							settingsUserData={this.props.settingsUser.data}
						/>
					</div>
				</section>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		settingsUser: state.user.settingsUser
	}
}

const mapDispatchToProps = dispatch => ({
	settingsUserUpdate: data => dispatch(actionsUser.settingsUserUpdate(data)),
	settingsUserGet: data => dispatch(actionsUser.settingsUserGet(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXSettingsUser)))