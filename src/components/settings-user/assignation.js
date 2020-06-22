import React from 'react'
import Select from 'react-select'
import { injectIntl } from 'react-intl'
import MultiLevelSelect from 'react-multi-level-selector';

class PXSettingsUserAssignation extends React.Component {
    constructor(props) {
        super(props)
        this.userRoleTypes = [
            { typeId: 0, typeName: "Manager" },
            { typeId: 1, typeName: "Analyst" },
            { typeId: 2, typeName: "Farmer" },
            { typeId: 3, typeName: "Association" },
            { typeId: 4, typeName: "Admin" },
        ]
        this.userRoleTypesEncoded = this.encodeOptions(this.userRoleTypes)
        this.options = [
            {
                value: 'fruits', label: 'Fruits',
                options: [
                    {
                        value: 'citrus', label: 'Citrus',
                        options: [
                            { value: 'orange', label: 'Orange' },
                            { value: 'grapefruits', label: 'GrapeFruits' },
                        ],
                    },
                    {
                        value: 'tropical', label: 'Tropical',
                        options: [
                            { value: 'mango', label: 'Mango' },
                            { value: 'papaya', label: 'Papaya' },
                        ],
                    },
                    {
                        value: 'berries', label: 'Berries',
                        options: [
                            { value: 'strawberry', label: 'Strawberry' },
                            { value: 'raspberries', label: 'Raspberries' },
                        ],
                    },
                ],
            },
            {
                value: 'city', label: 'City',
                options: [
                    { value: 'dublin', label: 'Dublin' },
                    { value: 'new york', label: 'New York' },
                    { value: 'san fransis', label: 'San Fransis' },
                ],
            }
        ]
    }
    encodeOptions = (parr) => {
        return parr.map((item) => {
            return {
                value: item.typeId,
                label: item.typeName
            }
        })
    }
    encodeValue = (parr) => {
        if (!parr || !parr.typeId) return this.userRoleTypesEncoded[0]
        return {
            value: parr.typeId,
            label: parr.typeName
        }
    }
    decodeValue = (parr) => {
        return {
            typeId: parr.value,
            typeName: parr.label,
        }
    }
    onChangeSelect = (value, label) => {
        if (this.props.onAction) {
            this.props.onAction({
                type: 'inputchange',
                payload: {
                    name: label,
                    value: this.decodeValue(value),
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
            user_role,
        } = this.props
        let user_role_encoded = this.encodeValue(user_role)
        return (
            <>
                <div className='section2-header'>{messages.settings_user.titleAssignation}</div>

                <div className="uk-grid-colapse">
                    <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                        <label htmlFor='user_role'>{messages.settings_user.userrole}</label>
                        <div className="uk-flex uk-flex-column">
                            <Select
                                name='user_role'
                                className="form-control"
                                classNamePrefix="select"
                                options={this.userRoleTypesEncoded}
                                value={user_role_encoded}
                                onChange={(e) => this.onChangeSelect(e, 'user_role')}
                            />
                            {this.props.validator.message('user_role', user_role, 'required')}
                        </div>
                    </div>
                </div>

                <div className="uk-grid-colapse">
                    <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                        <label htmlFor='user_role'>{messages.settings_user.orchards}</label>
                        <div className="uk-flex uk-flex-column">
                            <MultiLevelSelect
                                options={this.options}
                            />
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default injectIntl(PXSettingsUserAssignation)