import React from 'react'
import {withRouter} from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PXAddCorporateForm from '../../components/add-corporate'
import { addCorporate, updateCorporate } from "../../redux/corporate/actions"

class PXAddCorporate extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {}
  }
  
  handleSubmit = async (formValues) => {
    if(!formValues.corporateId){
      addCorporate(formValues)
    } else {
      updateCorporate(formValues)
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
      isLoading
    } = this.state
    
    return (
      <section className="forms-container with-bkg">
        <section className='new-user full-height small-pages uk-container uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <div className='uk-width-2-3@m uk-width-1-1'>
          <PXAddCorporateForm
            onSubmit = {this.handleSubmit}
          />
        </div>
      </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  addCorporate: data => dispatch(addCorporate(data)),
  updateCorporate: data => dispatch(updateCorporate(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXAddCorporate)))