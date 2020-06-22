import React from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Select from 'react-select'
import moment from 'moment'
import DatePicker from "react-datepicker";
import { PXCustomSizeClassLabel } from '../_common'
import  ComponentSizeLabel  from './componentSizeLabel'
import * as actionsOrchard from "../../redux/orchard/actions"

class StepCollectString extends React.Component {
  constructor(props) {
    super(props)
    this.newOrchardDataKeys = Object.keys(this.props.newOrchardData)
    this.state = {
      fruitTypeEncoded: '',
      fruitTypesEncoded: [],
      fruitVarietieEncoded: '',
      fruitVarietiesEncoded: [],
      bloomDate: '',
      harvestDate: '',
    }
    // console.log('StepCollectString constructor', this.props, this.state)
  }
  componentDidMount() {
    // console.log('StepCollectString componentDidMount', this.props, this.state)
    let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
    if (!fruitVarietiesLoaded) {
      this.props.fruitVarietiesGet()
    }
    if (fruitVarietiesLoaded) {
      let inputsInit = this.inputsInit({
        orchardData: this.props.newOrchardData,
      })
      console.log('inputsInit', inputsInit)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('StepCollectString componentDidUpdate', this.props, this.state)
    if (prevProps.fruitVarieties && prevProps.fruitVarieties.loading && !this.props.fruitVarieties.loading) {
      let inputsInit = this.inputsInit({
        orchardData: this.props.newOrchardData,
      })
      console.log('inputsInit', inputsInit)
    }
  }
  inputsReset = () => {
    let newState = {
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
      user: '', //integer (farmer id) 
      farm: null, //integer (farm id) *optional
      sizeClasses: [{
      
      }],
    }
    this.props.onAction({
      type: 'setState',
      payload: newState
    })

    let inputsInit = this.inputsInit({
      orchardData: newState,
    })
    // console.log('inputsInit', inputsInit)
  }
  inputsInit = (parr) => {
    let ret = {
      success: false,
      resp: '',
      newstate: {
        fruitTypeEncoded: '',
        fruitTypesEncoded: [],
        fruitVarietieEncoded: '',
        fruitVarietiesEncoded: [],
        bloomDate: '',
        harvestDate: '',
      }
    }
    ret.parr = parr
    if (!parr || !parr.orchardData) {
      ret.error = parr
      return ret
    }

    let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
    if (!fruitVarietiesLoaded) {
      ret.error = 'fruitVarietiesLoaded'
      return ret
    }

    //selects init
    ret.fruitVarietieParse = this.fruitVarietieParse(parr.orchardData.fruit)
    if (ret.fruitVarietieParse.success) {
      ret.newstate = { ...ret.newstate, ...ret.fruitVarietieParse.resp }
    }

    //date init
    ret.bloomDate = ''
    if (parr.orchardData.bloomDate !== '') {
      ret.bloomDate = moment(parr.orchardData.bloomDate).toDate()
    }
    ret.harvestDate = ''
    if (parr.orchardData.harvestDate !== '') {
      ret.harvestDate = moment(parr.orchardData.harvestDate).toDate()
    }
    ret.newstate = {
      ...ret.newstate,
      bloomDate: ret.bloomDate,
      harvestDate: ret.harvestDate,
    }


    this.setState({
      ...ret.newstate
    })
    ret.success = true
    return ret
  }
  fruitVarietieParse = (fruitVarietieDecoded) => {
    let ret = {
      success: false, resp: {
        fruitTypeEncoded: '',
        fruitTypesEncoded: [],
        fruitVarietieEncoded: '',
        fruitVarietiesEncoded: [],
      }
    }
    ret.parr = fruitVarietieDecoded
    if (typeof (ret.parr) === 'undefined') {
      ret.error = 'parr'
      return ret
    }
    let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
    if (!fruitVarietiesLoaded) {
      ret.error = 'fruitVarietiesLoaded'
      return ret
    }
    ret.found = false
    for (let typei in this.props.fruitVarieties.data) {
      let type = this.props.fruitVarieties.data[typei]
      ret.resp.fruitTypesEncoded.push({
        label: typei,
        value: typei,
      })
      for (let varietyi in type) {
        let variety = type[varietyi]
        if (variety === fruitVarietieDecoded) {
          ret.found = true
          ret.resp.fruitTypeEncoded = {
            label: typei,
            value: typei,
          }
          ret.resp.fruitVarietieEncoded = {
            label: varietyi,
            value: variety,
          }
          ret.fruitVarietiesEncode = this.fruitVarietiesEncode({ fruitTypeDecoded: typei })
          ret.resp.fruitVarietiesEncoded = ret.fruitVarietiesEncode.resp
        }
      }
    }
    ret.success = true
    return ret
  }
  fruitTypesEncode = () => {
    let ret = { success: false, resp: [] }
    let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
    if (!fruitVarietiesLoaded) {
      ret.error = 'fruitVarietiesLoaded'
      return ret
    }
    for (let i in this.props.fruitVarieties.data) {
      ret.resp.push({
        value: i,
        label: i,
      })
    }
    return ret
  }
  fruitVarietiesEncode = (parr) => {
    let ret = { success: false, resp: [] }
    ret.parr = parr
    if (!parr) {
      ret.error = 'parr'
      return ret
    }
    if (!parr.fruitTypeDecoded || parr.fruitTypeDecoded === '') {
      ret.error = 'parr.fruitTypeDecoded'
      return ret
    }
    let fruitVarietiesLoaded = (this.props.fruitVarieties && this.props.fruitVarieties.data && Object.keys(this.props.fruitVarieties.data).length > 0)
    if (!fruitVarietiesLoaded) {
      ret.error = 'fruitVarietiesLoaded'
      return ret
    }
    ret.fruitVarieties = this.props.fruitVarieties.data
    if (!ret.fruitVarieties[parr.fruitTypeDecoded]) {
      ret.error = 'not in list'
      return ret
    }
    ret.success = true
    for (let i in ret.fruitVarieties[parr.fruitTypeDecoded]) {
      ret.resp.push({
        value: ret.fruitVarieties[parr.fruitTypeDecoded][i],
        label: i,
      })
    }
    return ret
  }
  selectValueDecode = (valEncoded) => {
    let ret = { success: false, resp: '' }
    ret.parr = valEncoded
    if (!ret.parr || !ret.parr.value) {
      return ret
    }
    ret.resp = ret.parr.value
    return ret
  }
  selectValueEncode = (parr) => {
    let ret = { success: false, resp: { value: '', label: '' } }
    ret.parr = parr
    if (!ret.parr.valDecoded || !ret.parr.valsEncoded) {
      return ret
    }
    ret.resp.value = parr.valDecoded
    for (let i in ret.parr.valsEncoded) {
      if (ret.parr.valsEncoded[i].value === parr.valDecoded) {
        ret.resp.label = ret.parr.valsEncoded[i].label
        break;
      }
    }
    return ret
  }
  onFruitTypeChange = (fruitTypeEncoded) => {
    let selectValueDecode = this.selectValueDecode(fruitTypeEncoded)
    let fruitVarietiesEncode = this.fruitVarietiesEncode({ fruitTypeDecoded: selectValueDecode.resp })
    this.setState({
      fruitTypeEncoded: fruitTypeEncoded,
      fruitVarietiesEncoded: fruitVarietiesEncode.resp,
    })
    this.props.onAction({
      type: 'inputchange',
      payload: {
        name: 'fruit',
        value: 0,
      }
    })
  }
  onChangeInput = (e) => {
    if (this.newOrchardDataKeys.includes(e.target.name)) {
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

    if (Object.keys(this.state).includes(e.target.name)) {
      this.setState({
        [`${e.target.name}`]: e.target.value
      })
    }
  }
  handleSizeLabel = (parr) => {
    switch (parr.type) {
      case 'setState':
        this.props.onAction({
          type: 'setState',
          payload: parr.payload
        })
        break;
      default:
    }
  }
  onChangeSelect = (value, label) => {
    if (this.newOrchardDataKeys.includes(label)) {
      let selectValueDecode = this.selectValueDecode(value)
      if (this.props.onAction) {
        this.props.onAction({
          type: 'inputchange',
          payload: {
            name: label,
            value: selectValueDecode.resp,
          }
        })
      }
    }
    if (Object.keys(this.state).includes(label)) {
      this.setState({
        [`${label}`]: value
      })
    }
  }
  onChangeDatePicker = (date, label) => {
    const dateformated = moment(date).format('YYYY-MM-DD')
    // console.log('onChangeDatePicker', date, dateformated)
    if (this.newOrchardDataKeys.includes(label)) {
      if (this.props.onAction) {
        this.props.onAction({
          type: 'inputchange',
          payload: {
            name: label,
            value: dateformated,
          }
        })
      }
    }
    if (Object.keys(this.state).includes(label)) {
      this.setState({
        [`${label}`]: date
      })
    }
  }
  openDatepicker = (parr) => {
    this['_ref_calendar_' + parr].setOpen(true)
  }
  onStepSubmit(step) {
    if (this.props.validator.allValid()) {
      this.props.onAction({ type: 'submitStep', payload: { step: step } })
    } else {
      // console.log('validator',this.props.validator)
      this.props.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const {
      intl: {
        messages
      },
    } = this.props

    const {
      orchardName,
      ageOfTrees,
      numberOfTrees,
      lastHarvest,
      bloomDate,
      harvestDate,
      sizeClasses,
    } = this.props.newOrchardData

    let selectValueEncode = this.selectValueEncode({
      valDecoded: this.props.newOrchardData.fruit,
      valsEncoded: this.state.fruitVarietiesEncoded
    })
    if (selectValueEncode.resp.value === '') {
      selectValueEncode.resp = ''
    }
    const fruit = selectValueEncode.resp

    let bloomDateFormated = ''
    if (bloomDate !== '') {
      bloomDateFormated = moment(bloomDate).format('DD-MM-YYYY')
    }
    let harvestDateFormated = ''
    if (harvestDate !== '') {
      harvestDateFormated = moment(harvestDate).format('DD-MM-YYYY')
    }

    const sizeClassCustomLabels = this.props.sizeClassCustomLabels
    // console.log('sizeClasses', sizeClasses)
    this.props.validator.purgeFields();
    return (
      <div className='uk-flex uk-flex-center'>
        <form className="add-form uk-flex uk-flex-column uk-width-2-3" action="" name="">
          <div className="elements-group uk-flex uk-flex-column">
            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='orchardName'>{messages.add_orchard.name}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="orchardName"
                    className="form-control"
                    value={orchardName}
                    placeholder={messages.add_orchard.name}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.props.validator.showMessageFor('name')}
                  />
                  {this.props.validator.message('orchardName', orchardName, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='fruitTypeEncoded'>{messages.add_orchard.fruitType}</label>
                <div className="uk-flex uk-flex-column">
                  <Select
                    name='fruitTypeEncoded'
                    className="form-control"
                    classNamePrefix="select"
                    options={this.state.fruitTypesEncoded}
                    value={this.state.fruitTypeEncoded}
                    onChange={(value) => this.onFruitTypeChange(value)}
                  />
                  {this.props.validator.message('fruitTypeEncoded', this.state.fruitTypeEncoded, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='fruit'>{messages.add_orchard.fruitVariaty}</label>
                <div className="uk-flex uk-flex-column">
                  <Select
                    name='fruit'
                    className="form-control"
                    classNamePrefix="select"
                    options={this.state.fruitVarietiesEncoded}
                    value={fruit}
                    onChange={(e) => this.onChangeSelect(e, 'fruit')}
                  />
                  {this.props.validator.message('fruit', fruit, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='ageOfTrees'>{messages.add_orchard.treesAge}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="ageOfTrees"
                    className="form-control"
                    value={ageOfTrees}
                    placeholder={messages.add_orchard.treesAge}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.props.validator.showMessageFor('name')}
                  />
                  {this.props.validator.message('ageOfTrees', ageOfTrees, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='numberOfTrees'>{messages.add_orchard.treesNum}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="numberOfTrees"
                    className="form-control"
                    value={numberOfTrees}
                    placeholder={messages.add_orchard.treesNum}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.props.validator.showMessageFor('name')}
                  />
                  {this.props.validator.message('numberOfTrees', numberOfTrees, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='lastHarvest'>{messages.add_orchard.lastHarvestVolume}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="lastHarvest"
                    className="form-control"
                    value={lastHarvest}
                    placeholder={messages.add_orchard.lastHarvestVolume}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.props.validator.showMessageFor('name')}
                  />
                  {this.props.validator.message('lastHarvest', lastHarvest, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='bloomDate'>{messages.add_orchard.firstBloomDate}</label>
                <div className="uk-flex uk-flex-column">
                  <div className="uk-flex uk-flex-row uk-flex-middle date-select">
                    <DatePicker
                      name="bloomDate"
                      className="form-control"
                      selected={this.state.bloomDate}
                      placeholderText={messages.add_orchard.firstBloomDate}
                      onChange={(e) => this.onChangeDatePicker(e, 'bloomDate')}
                      value={bloomDateFormated}
                      dateFormat="dd-MM-yyyy"
                      onBlur={() => this.props.validator.showMessageFor('bloomDate')}
                      ref={(c) => this['_ref_calendar_' + 'bloomDate'] = c}
                    />
                    <label className='date-label' onClick={() => this.openDatepicker('bloomDate')}><span uk-icon="icon: calendar; ratio: 1.5"></span></label>
                  </div>
                  {this.props.validator.message('bloomDate', bloomDate, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='harvestDate'>{messages.add_orchard.anticipatedHarvestTime}</label>
                <div className="uk-flex uk-flex-column">
                  <div className="uk-flex uk-flex-row uk-flex-middle date-select">
                    <DatePicker
                      name="harvestDate"
                      className="form-control"
                      selected={this.state.harvestDate}
                      placeholderText={messages.add_orchard.anticipatedHarvestTime}
                      onChange={(e) => this.onChangeDatePicker(e, 'harvestDate')}
                      value={harvestDateFormated}
                      dateFormat="dd-MM-yyyy"
                      onBlur={() => this.props.validator.showMessageFor('harvestDate')}
                      ref={(c) => this['_ref_calendar_' + 'harvestDate'] = c}
                    />
                    <label className='date-label' onClick={() => this.openDatepicker('harvestDate')}><span uk-icon="icon: calendar; ratio: 1.5"></span></label>
                  </div>
                  {this.props.validator.message('harvestDate', harvestDate, 'required')}
                </div>
              </div>
            </div>

            <div className='custom-sizes'>
              <div className="uk-grid-colapse">
                <div className="input-holder form-group uk-width-1-1 uk-flex uk-flex-middle">
                  <label>{messages.add_orchard.sizeClassTitle}</label>
                </div>
              </div>

              <div className="uk-grid-colapse">
                <div className="input-holder form-group uk-width-1-1 uk-flex uk-flex-middle">
                  <ComponentSizeLabel
                    data={sizeClasses}
                    onAction={this.props.onAction}
                    validator={this.props.validator}
                  />
                </div>
              </div>
            </div>

            <div className='uk-flex uk-flex-center'>
              <div className='button-holder uk-width-1-4@s uk-width-1-1 uk-text-center'>
                <div className='btns' onClick={() => this.onStepSubmit(1)}>{messages.add_orchard.next}</div>
                <div className='link' onClick={() => this.inputsReset()}>{messages.add_orchard.cancel}</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    fruitVarieties: state.orchard.fruitVarieties
  }
}
const mapDispatchToProps = dispatch => ({
  fruitVarietiesGet: data => dispatch(actionsOrchard.fruitVarietiesGet(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(StepCollectString)))