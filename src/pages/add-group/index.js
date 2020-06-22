import React from 'react'
import {withRouter} from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PXAddGroupForm from '../../components/add-group'
import {
  addGroup,updateGroup
} from '../../redux/group/actions'

class PXAddGroup extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      submit_msg: {
        type: '',
        text: ''
      },
    }
  }
  
  handleSubmit = async (formValues) => {
    const {
      intl: {
        messages
      }
    } = this.props
    
    
    if (!formValues.groupId) {
      const submit = await this.props.addGroup(formValues)
      if(submit && submit.status === 201) {
        this.setState({
          submit_msg: {
            type: 'success',
            text: messages.add_group.success,
          }
        })
      } else {
        this.setState({
          submit_msg: {
            type: 'error',
            text: messages.add_group.error,
          }
        })
      }
    } else {
      const submit = await this.props.updateGroup(formValues)
      if(submit && submit.status === 201) {
        this.setState({
          submit_msg: {
            type: 'success',
            text: messages.add_group.update_success,
          }
        })
      } else {
        this.setState({
          submit_msg: {
            type: 'success',
            text: messages.add_group.update_error,
          }
        })
      }
    }
  }
  
  render() {
    const {
      submit_msg,
    } = this.state
    
    return (
      <section className="forms-container with-bkg">
        <section className='full-height small-pages uk-container uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <div className='uk-width-2-3@m uk-width-1-1'>
            <PXAddGroupForm
              onSubmit = {this.handleSubmit}
              message={submit_msg}
            />
          </div>
      </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  addGroup: data => dispatch(addGroup(data)),
  updateGroup: data => dispatch(updateGroup(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXAddGroup)))