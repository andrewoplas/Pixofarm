import React from 'react'
import { injectIntl } from 'react-intl'

class PXSettingsUserProfile extends React.Component {
    constructor(props) {
        super(props)
    }
    onChangeInput = (e) => {
        if (this.props.onAction) {
            this.props.onAction({
                type: 'inputchange',
                payload: {
                    name: e.target.name,
                    value: e.target.value,
                }
            })
        }
    }
    render() {
        const {
            intl: {
                messages
            },
        } = this.props

        const {
            first_name,
            email,
            mobilenumber,
        } = this.props

        return (
            <>
                <div className='section2-header'>{messages.settings_user.titleProfile}</div>
                <div className="uk-grid-colapse">
                    <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                        <label htmlFor='first_name'>{messages.settings_user.first_name}</label>
                        <div className="uk-flex uk-flex-column">
                            <input
                                type="text"
                                name="first_name"
                                className="form-control"
                                value={first_name||''}
                                placeholder={messages.settings_user.first_name}
                                onChange={(e) => this.onChangeInput(e)}
                                onBlur={() => this.props.validator.showMessageFor('first_name')}
                            />
                            {this.props.validator.message('first_name', first_name, 'required')}
                        </div>
                    </div>
                </div>

                <div className="uk-grid-colapse">
                    <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                        <label htmlFor='email'>{messages.settings_user.email}</label>
                        <div className="uk-flex uk-flex-column">
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={email||''}
                                placeholder={messages.settings_user.email}
                                onChange={(e) => this.onChangeInput(e)}
                                onBlur={() => this.props.validator.showMessageFor('email')}
                            />
                            {this.props.validator.message('email', email, 'required|email')}
                        </div>
                    </div>
                </div>

                <div className="uk-grid-colapse">
                    <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                        <label htmlFor='mobilenumber'>{messages.settings_user.mobilenumber}</label>
                        <div className="uk-flex uk-flex-column">
                            <input
                                type="tel"
                                name="mobilenumber"
                                className="form-control"
                                value={mobilenumber||''}
                                placeholder={messages.settings_user.mobilenumber}
                                onChange={(e) => this.onChangeInput(e)}
                                onBlur={() => this.props.validator.showMessageFor('mobilenumber')}
                            />
                            {this.props.validator.message('mobilenumber', mobilenumber, 'required|phone')}
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default injectIntl(PXSettingsUserProfile)