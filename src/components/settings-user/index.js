import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import PXSettingsUserProfile from './profile'
import PXSettingsUserNotification from './notification'
import PXSettingsUserMeasurement from './measurement'
import PXSettingsUserAssignation from './assignation'
import PXSettingsUserAvatar from './avatar'
import { getParamsAsObject, getLocalizedPath, urlserialize } from '../../utils/funcs'

import './index.css'

class PXSettingsUserComponent extends React.Component {
	constructor(props) {
		super(props)
		let settingsUserDataini = {
			id: null,
			address: null,
			city: null,
			province: null,
			date_joined: null,
			email: '',
			first_name: '',
			last_login: null,
			mobilenumber: '',
			user_role: null,
			user_type: null,
			village: null,
		}
		this.state = {
			settingsUserData: this.props.settingsUserData || settingsUserDataini,
		}
	}
	componentDidMount() {
		const {
			intl: { messages, locale },
		} = this.props
		let ret = {}
		if (typeof (window.localStorage.currentUser) !== 'undefined') {
			ret.currentUser = JSON.parse(window.localStorage.currentUser)
			if (typeof (ret.currentUser.token) !== 'undefined') {
				ret.px_token = ret.currentUser.token
			}
		}
		ret.getLocalizedPath_login = getLocalizedPath('/login', locale)
		ret.getParamsAsObject = getParamsAsObject(window.location.search)
		ret.try = 0
		if (typeof (ret.getParamsAsObject.try) !== 'undefined' && parseInt(ret.getParamsAsObject.try) > 0) {
			ret.try = parseInt(ret.getParamsAsObject.try)
		}
		ret.try++
		ret.urlsearch = {
			nexturl: window.location.pathname,
			try: ret.try,
		}
		ret.urlsearchserial = urlserialize(ret.urlsearch)
		if (typeof (ret.px_token) === 'undefined' || ret.px_token === '') {
			if (ret.urlsearch.try < 10) {
				this.props.history.push(ret.getLocalizedPath_login + '?' + ret.urlsearchserial)
				return
			}
		}
	}
	componentDidUpdate(prevProps) {
		// console.log('PXSettingsUserComponent componentDidUpdate', this.props)
		if (prevProps.settingsUserData && this.props.settingsUserData && (JSON.stringify(this.props.settingsUserData) !== JSON.stringify(prevProps.settingsUserData))) {
			console.log('PXSettingsUserComponent componentDidUpdate setstate', this.props, this.state)
			this.setState({
				settingsUserData: this.props.settingsUserData
			})

		}
	}
	componentWillMount() {
		const {
			intl: {
				locale,
				messages
			}
		} = this.props

		this.validator = new SimpleReactValidator({
			autoForceUpdate: this,
			className: 'uk-text-danger uk-animation-slide-top-small',
			locale: `${locale}`,
			messages: {
				required: messages.validator.required,
				alpha: messages.validator.alpha,
				email: messages.validator.email,
				phone: messages.validator.phone,
				min: messages.validator.min,
			},
		});
	}
	submitForm = () => {
		if (this.validator.allValid()) {
			this.props.onSubmit(this.state.settingsUserData)
		} else {
			this.validator.showMessages();
			this.forceUpdate();
		}
	}
	handleAction = (parr) => {
		console.log('PXSettingsUserComponent handleAction', parr, Object.keys(this.state.settingsUserData))
		switch (parr.type) {
			case 'inputchange':
				if (Object.keys(this.state.settingsUserData).includes(parr.payload.name)) {
					this.setState({
						settingsUserData: {
							...this.state.settingsUserData,
							[parr.payload.name]: parr.payload.value
						},
					})
				} else {
					this.setState({
						[parr.payload.name]: parr.payload.value
					})

				}
				break;
			default:
		}
	}

	render() {
		const {
			intl: {
				messages
			},
			inModal
		} = this.props
		const {
			fullName,
			emailAddress,
			phoneNumber,
			alertType,
			autoAproveType,
			weightType,
			distanceType,
			surfaceType,
			temperatureType,
			userRoleType,
		} = this.state
		const {
			address,
			city,
			province,
			date_joined,
			email,
			first_name,
			last_login,
			mobilenumber,
			user_role,
			user_type,
			village,
			status,
		} = this.state.settingsUserData
		// console.log('PXSettingsUserComponent render fullName', fullName)
		return (
			<div className='form-holder'>
				<div className='section-header'>{messages.settings_user.title}</div>
				<PXSettingsUserAvatar />
				<form className="settings-form uk-flex uk-flex-center">
					<div className="elements-group uk-flex uk-flex-column uk-width-1-1">
						<PXSettingsUserProfile
							onAction={this.handleAction}
							validator={this.validator}
							first_name={first_name}
							email={email}
							mobilenumber={mobilenumber}
						/>
						<PXSettingsUserNotification
							onAction={this.handleAction}
							validator={this.validator}
							alertType={alertType}
							autoAproveType={autoAproveType}
						/>
						<PXSettingsUserMeasurement
							onAction={this.handleAction}
							validator={this.validator}
							weightType={weightType}
							distanceType={distanceType}
							surfaceType={surfaceType}
							temperatureType={temperatureType}
						/>
						<PXSettingsUserAssignation
							onAction={this.handleAction}
							validator={this.validator}
							user_role={user_role}
						/>
						<div className='button-holder uk-width-1-1 uk-flex uk-flex-middle'>
							<div className='btns uk-width-1-3@m uk-width-1-1' onClick={() => this.submitForm()}>{messages.settings_user.save}</div>
							<span className="uk-width-1-6@m uk-width-1-1 uk-text-center">{messages.settings_user.cancel}</span>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

PXSettingsUserComponent.propTypes = {
	onSubmit: PropTypes.func,
}

export default injectIntl(withRouter(PXSettingsUserComponent))