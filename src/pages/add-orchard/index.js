import React from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PXAddOrchardForm from '../../components/add-orchard'
import Logo  from '../../components/logo'
import { addOrchard, updateOrchard, orchardDetailsGet } from "../../redux/orchard/actions"
import * as actionsOrchard from "../../redux/orchard/actions"
import { getParamsAsObject, getLocalizedPath, urlserialize } from '../../utils/funcs'
import { DEFAULT_SIZE_CLASS_CUSTOM_LABEL } from '../../utils/constants'

class PXAddOrchard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      orchardData: {
        orchardName: '', //String(max=20)
        orchardSize: '', //integer
        calculatedSize: '', //integer (which is calculated by google API)
        location: '', //str (by google API)
        numberOfTrees: '', //integer
        ageOfTrees: '', //integer
        fruit: '', //integer(id)
        lastHarvest: '', //integer
        averageFruits: '', //integer
        bloomDate: '', //date
        harvestDate: '', //date
        gpsLatitude: '', //string (separated by comma like: 2.0156840,84.15701,31.180847,42.1740745)
        gpsLongitude: '', //string (separated by comma like: 2.0156840,84.15701,31.180847,42.1740745)
        user: '',//271 //integer (farmer id) 
        farm: null, //integer (farm id) *optional
        sizeClasses: [DEFAULT_SIZE_CLASS_CUSTOM_LABEL],
      },
      loading: true,
      mode: 'edit',
    }
  }

  componentDidMount() {
    let ret = {}
    ret.getParamsAsObject = getParamsAsObject(window.location.search)
    if (typeof (ret.getParamsAsObject.orchardId) !== 'undefined' && parseInt(ret.getParamsAsObject.orchardId) > 0) {
      ret.orchardId = parseInt(ret.getParamsAsObject.orchardId)
    }
    ret.loading = false
    ret.mode = 'add'
    if (ret.orchardId) {
      this.props.orchardDetailsGet(ret.orchardId)
      ret.loading = true
      ret.mode = 'edit'
      let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
      if (!fruitVarietiesLoaded) {
        this.props.fruitVarietiesGet()
      }
    }
    this.setState({
      loading: ret.loading,
      mode: ret.mode,
    })
    console.log('PXAddOrchard componentDidMount', ret)
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.orchardDetails && prevProps.orchardDetails.loading && !this.props.orchardDetails.loading) {
      console.log('PXAddOrchard componentDidUpdate orchardDetailsLoaded', this.props)
      this.onDataLoaded()
    }
    if (prevProps && prevProps.fruitVarieties && prevProps.fruitVarieties.loading && !this.props.fruitVarieties.loading) {
      console.log('PXAddOrchard componentDidUpdate fruitVarietiesLoaded', this.props)
      this.onDataLoaded()
    }
  }
  
  onDataLoaded = () => {
    let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
    let orchardDetailsLoaded = (this.props.orchardDetails && this.props.orchardDetails.data && Object.keys(this.props.orchardDetails.data).length > 0)
    if (fruitVarietiesLoaded && orchardDetailsLoaded) {
      let orchardDataParse = this.orchardDataParse({ orchardData: this.props.orchardDetails.data, fruitObj: this.props.fruitVarieties.data })
      console.log('orchardDataParse', orchardDataParse)
      let orchardData = this.props.orchardDetails.data
      if (orchardDataParse.success) {
        orchardData = orchardDataParse.resp
      }
      this.setState({
        loading: false,
        orchardData: orchardData,
      })
    }
  }
  
  orchardDataParse = (parr) => {
    let ret = { success: false, fruit: 0, resp: {} }
    ret.parr = parr
    if (!parr || !parr.orchardData || !parr.orchardData.fruit || !parr.orchardData.fruit.type || !parr.fruitObj) {
      ret.error = 'parr'
      return ret
    }
    ret.found = false
    for (let type in parr.fruitObj) {
      let varieties = parr.fruitObj[type]
      for (let varietyi in varieties) {
        let variety = varieties[varietyi]
        // console.log('orchardDataParse', type, variety, varietyi)
        if (parr.orchardData.fruit.type === type && parr.orchardData.fruit.variety === varietyi) {
          ret.found = true
          ret.fruit = variety
        }
        if (ret.found === true) break
      }
      if (ret.found === true) break
    }
    ret.resp = {
      ...parr.orchardData,
      fruit: ret.fruit
    }
    ret.success = true
    return ret
  }
  
  handleSubmit = async (formValues) => {
    if (this.state.mode === 'add') {
      await this.props.addOrchard(formValues)
      
      //redirect to orchards list page
      this.props.history.push({pathname: getLocalizedPath(`/orchards`, this.props.intl.locale)})
    } else if (this.state.mode === 'edit') {
      updateOrchard(formValues)
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
      loading
    } = this.state
  
    if (loading) return <div className="spinner-holder"><Logo /><div className='spinner'></div></div>
    
    return (
      <section className="forms-container with-bkg">
        <section className='full-height small-pages uk-container uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <div className='uk-width-1-1'>
            <PXAddOrchardForm
              orchardData={this.state.orchardData}
              onSubmit={this.handleSubmit}
            />
          </div>
        </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  orchardDetails: state.orchard.orchardDetails,
  fruitVarieties: state.orchard.fruitVarieties
})

const mapDispatchToProps = dispatch => ({
  addOrchard: data => dispatch(addOrchard(data)),
  updateOrchard: data => dispatch(updateOrchard(data)),
  orchardDetailsGet: data => dispatch(orchardDetailsGet(data)),
  fruitVarietiesGet: data => dispatch(actionsOrchard.fruitVarietiesGet(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXAddOrchard)))