import React from 'react'
import { injectIntl } from 'react-intl'

class PXSettingsUserMeasurement extends React.Component {
    constructor(props) {
        super(props)
        const {
            intl: {
                messages, locale
            },
        } = props
        
        this.weightTypes = [
            { value: 'tones', label: messages.settings_user.tones },
            { value: 'pounds', label: messages.settings_user.pounds },
        ]
        this.distanceTypes = [
            { value: 'meters', label: messages.settings_user.meters },
            { value: 'feet', label: messages.settings_user.feet },
        ]
        this.surfaceTypes = [
            { value: 'hectares', label: messages.settings_user.hectares },
            { value: 'acres', label: messages.settings_user.acres },
        ]
        this.temperatureTypes = [
            { value: 'c', label: String.fromCharCode(parseInt(2103, 16)) },
            { value: 'f', label: String.fromCharCode(parseInt(2109, 16)) },
        ]
        this.state = {
            weightType: props.weightType ? props.weightType : this.weightTypes[0],
            distanceType: props.distanceType ? props.distanceType : this.distanceTypes[0],
            surfaceType: props.surfaceType ? props.surfaceType : this.surfaceTypes[0],
            temperatureType: props.temperatureType ? props.temperatureType : this.temperatureTypes[0],
        }
        // console.log('state', this.state)
    }
    componentDidUpdate(prevProps) {
        // console.log('PXSettingsUserMeasurement componentDidUpdate', this.props)
        if (prevProps.weightType !== this.props.weightType) { this.setState({ weightType: this.props.weightType }) }
        if (prevProps.distanceType !== this.props.distanceType) { this.setState({ distanceType: this.props.distanceType }) }
        if (prevProps.surfaceType !== this.props.surfaceType) { this.setState({ surfaceType: this.props.surfaceType }) }
        if (prevProps.temperatureType !== this.props.temperatureType) { this.setState({ temperatureType: this.props.temperatureType }) }
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

    inputRadioButtonSwitch = (props) => {
        let propsini = {
            label: 'Label',
            name: 'labelName',
            options: [
                { value: 'option1', label: 'Option1' },
                { value: 'option2', label: 'Option2' },
            ],
            option: { value: 'option1', label: 'option1' },
        }
        props = Object.assign(propsini, props)
        let buttonskey = 0;
        let buttons = props.options.map((option) => {
            buttonskey++
            let active = props.option.value === option.value
            return (
                <button
                    key={buttonskey}
                    type='button'
                    onClick={() => this.onChangeSelect(option, props.name)}
                    className={(active ? 'active ' : '') + "btns alternative"}
                >
                    {option.label}
                </button>
            )
        })
        return (
            <div className="uk-grid-colapse">
                <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                    <label htmlFor={props.name}>{props.label}</label>
                    <div className="uk-flex uk-flex-column">
                        <div className="inputRadioButtonSwitch uk-button-group uk-flex uk-flex-row uk-child-width-1-2 ">
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {
            intl: {
                messages
            },
            inModal
        } = this.props

        const {
            weightType,
            distanceType,
            surfaceType,
            temperatureType,
        } = this.state

        return (
            <>
                <div className='section2-header'>{messages.settings_user.titleMeasurements}</div>
                {this.inputRadioButtonSwitch({
                    label: messages.settings_user.weight,
                    name: 'weightType',
                    options: this.weightTypes,
                    option: weightType,
                })}
                {this.inputRadioButtonSwitch({
                    label: messages.settings_user.distance,
                    name: 'distanceType',
                    options: this.distanceTypes,
                    option: distanceType,
                })}
                {this.inputRadioButtonSwitch({
                    label: messages.settings_user.surface,
                    name: 'surfaceType',
                    options: this.surfaceTypes,
                    option: surfaceType,
                })}
                {this.inputRadioButtonSwitch({
                    label: messages.settings_user.temperature,
                    name: 'temperatureType',
                    options: this.temperatureTypes,
                    option: temperatureType,
                })}
            </>

        )
    }
}

export default injectIntl(PXSettingsUserMeasurement)