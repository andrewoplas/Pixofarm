import React from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import * as actionsUser from "../../redux/user/actions"
import config from '../../config'
const avatardefault = require('../../assets/images/avatar.png');

class PXSettingsUserAvatar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // console.log('PXSettingsUser componentDidMount',this.props)
        this.props.avatarUserGet({ id: 112 })
    }

    onChange = e => {
        const errs = []
        const files = Array.from(e.target.files)

        const formData = new FormData()
        const types = config.validate.imageupload.types
        const sizemax = config.validate.imageupload.sizemax

        files.forEach((file, i) => {

            if (types.every(type => file.type !== type)) {
                errs.push(`'${file.type}' is not a supported format`)
            }

            if (file.size > sizemax) {
                errs.push(`'${file.name}' is too large, please pick a smaller file`)
            }

            formData.append(i, file)
        })
        // console.log('onChange', errs)
        if (errs.length) {
            console.error('PXSettingsUserAvatar', errs)
            return
        }
        this.props.avatarUserUpdate(formData)
    }
    render() {
        const {
            intl: {
                messages
            },
        } = this.props

        const {
            avatarUser: {
                data: {
                    avatar,
                }
            }
        } = this.props
        let avatarcurrent = avatar || avatardefault
        return (
            <div className='uk-flex uk-flex-right uk-flex-middle uk-grid-small'>
                <div className='avatar-actions'>
                    <label className='link file-input' htmlFor='settingsuseravatarinputfile'>
                        change avatar
                    </label>
                    <input
                        type='file'
                        id='settingsuseravatarinputfile'
                        style={{ display: 'none' }}
                        onChange={this.onChange}
                    />
                </div>
                <div className='avatar-image'>
                    <img
                        src={avatarcurrent}
                        alt='avatar'
                    />
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        avatarUser: state.user.avatarUser
    }

}

const mapDispatchToProps = dispatch => ({
    avatarUserUpdate: data => dispatch(actionsUser.avatarUserUpdate(data)),
    avatarUserGet: data => dispatch(actionsUser.avatarUserGet(data)),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXSettingsUserAvatar))