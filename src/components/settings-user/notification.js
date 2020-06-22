import React from 'react'
import Select from 'react-select'
import { injectIntl } from 'react-intl'

class PXSettingsUserNotification extends React.Component {
    constructor(props) {
        super(props)
        this.alertTypes = [
            { value: 'first', label: 'First' },
            { value: 'second', label: 'Second' },
        ]
        this.autoAproveTypes = [
            { value: 'aprove1', label: 'Aprove1' },
            { value: 'aprove2', label: 'Aprove2' },
        ]
        this.state = {
            alertType: props.alertType ? props.alertType : this.alertTypes[0],
            autoAproveType: props.autoAproveType ? props.autoAproveType : this.autoAproveTypes[0],
        }
    }
    componentDidUpdate(prevProps) {
        // console.log('PXSettingsUserNotification componentDidUpdate', this.props)
        if (prevProps.alertType !== this.props.alertType) { this.setState({ alertType: this.props.alertType }) }
        if (prevProps.autoAproveType !== this.props.autoAproveType) { this.setState({ autoAproveType: this.props.autoAproveType }) }
    }
    onChangeInput = (e) => {
        this.setState({
            [`${e.target.name}`]: e.target.value
        })
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
    onChangeSelect = (value, label) => {
        this.setState({
            [`${label}`]: value
        })
        if (this.props.onAction) {
            this.props.onAction({
                type: 'inputchange',
                payload: {
                    name: label,
                    value: value,
                }
            })
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
            alertType,
            autoAproveType,
        } = this.state

        return (
            <>
                <div className='section2-header'>{messages.settings_user.titleNotification}</div>

                <div className="uk-grid-colapse">
                    <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                        <label htmlFor='alertType'>{messages.settings_user.alerts}</label>
                        <div className="uk-flex uk-flex-column">
                            <Select
                                name='alertType'
                                className="form-control"
                                classNamePrefix="select"
                                options={this.alertTypes}
                                value={alertType}
                                onChange={(e) => this.onChangeSelect(e, 'alertType')}
                            />
                            {this.props.validator.message('alertType', alertType, 'required')}
                        </div>
                    </div>
                </div>

                <div className="uk-grid-colapse">
                    <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                        <label htmlFor='autoAproveType'>{messages.settings_user.automatically_aprove}</label>
                        <div className="uk-flex uk-flex-column">
                            <Select
                                name='autoAproveType'
                                className="form-control"
                                classNamePrefix="select"
                                options={this.autoAproveTypes}
                                value={autoAproveType}
                                onChange={(e) => this.onChangeSelect(e, 'autoAproveType')}
                            />
                            {this.props.validator.message('autoAproveType', autoAproveType, 'required')}
                        </div>
                    </div>
                </div>

            </>

        )
    }
}

export default injectIntl(PXSettingsUserNotification)