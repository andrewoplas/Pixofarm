import React from 'react'
import {withRouter} from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PXAddFarmForm from '../../components/add-farm'
import { addFarm, updateFarm } from "../../redux/farm/actions"

class PXAddFarm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      submit_msg: '',
    }
  }
  
  handleSubmit = async (formValues) => {
    const {
      intl: {
        messages
      }
    } = this.props
    
    if (!formValues.farmId) {
      const submit = await this.props.addFarm(formValues)
      if(submit && submit.status === 201) {
        this.setState({submit_msg: messages.add_farm.success})
      } else {
        this.setState({submit_msg: messages.add_farm.error})
      }
    } else {
      this.props.updateFarm(formValues)
    }
  }
  
  render() {
    const {
      intl: {
        messages, locale
      },
    } = this.props
    
    const {
      terms,
      isLoading,
      submit_msg,
    } = this.state
    
    return (
      <section className="forms-container with-bkg">
        <section className='full-height small-pages uk-container uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <div className='uk-width-2-3@m uk-width-1-1'>
          <PXAddFarmForm
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
  addFarm: data => dispatch(addFarm(data)),
  updateFarm: data => dispatch(updateFarm(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXAddFarm)))