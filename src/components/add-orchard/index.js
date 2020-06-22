import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import SimpleReactValidator from 'simple-react-validator'
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css'
import Logo  from '../../components/logo'
import {
  PXSelectUser,
  PXCustomDropDown,
  PXGoogleMap
} from '../_common';
import StepCollectString from './stepCollectString'
import {
  getAllUsers as getAllUsersRedux,
} from '../../redux/user/actions'
import {
  getAllGroupsFarmsOrchards as getAllGroupsFarmsOrchardsRedux,
} from '../../redux/farm/actions'

import './style.css'

class PXAddOrchard extends React.Component {
  constructor(props) {
    super(props)

    const {
      intl: {
        messages
      }
    } = this.props

    this.state = {
      newOrchardData: this.props.orchardData || null,
      users: [],
      groupsFarmsOrchards: {},
      activeStep: 0,
      steps: [
        {
          key: 0,
          label: messages.add_orchard.step1,
          status: 1,
          data: {},
        },
        {
          key: 1,
          label: messages.add_orchard.step2,
          status: 0,
          data: {},
        },
        {
          key: 2,
          label: messages.add_orchard.step3,
          status: 0,
          data: {},
        },
      ],
      modalOpen: false,
      loadingUsers: false,
      loadingGroups: false,
    }
  }
  
  componentWillMount() {
    const {
      intl: {
        locale,
        messages
      }
    } = this.props

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      className: 'uk-text-danger uk-animation-slide-top-small',
      locale: `${locale}`,
      messages: {
        required: messages.add_corporate.req.required,
        alpha: messages.add_corporate.req.alpha,
        email: messages.add_corporate.req.email,
        phone: messages.add_corporate.req.phone,
        min: messages.add_corporate.req.min,
        numeric: messages.add_corporate.req.num,
      },
    });

    this.loadUsers()
    this.loadGroups()
  }
  
  loadUsers = async () => {
    this.setState({
      loadingUsers: true
    })
    const users = await this.props.getAllUsers()

    const selectableUsers = await Object.values(users.data).map((user) => {
      return {
        value: user.id,
        label: user.first_name,
      }
    })

    this.setState({
      users: selectableUsers,
      loadingUsers: false,
    })
  }
  
  loadGroups = async () => {
    const {
      intl: {
        messages
      }
    } = this.props
    
    const {
      getAllGroupsFarmsOrchards
    } = this.props
    
    this.setState({loadingGroups: true})
    
    const groups = await getAllGroupsFarmsOrchards()
    if (groups.data) {
      this.setState({
        groupsFarmsOrchards: groups,
      })
    }
  
    this.setState({loadingGroups: false})
  }
  
  handleAction = (parr) => {
    switch (parr.type) {
      case 'inputchange':
        if (Object.keys(this.state.newOrchardData).includes(parr.payload.name)) {
          this.setState({
            newOrchardData: {
              ...this.state.newOrchardData,
              [parr.payload.name]: parr.payload.value
            },
          })
        }
        break;

      case 'submitStep':
        this.setState({
          activeStep: parr.payload.step
        })
        break;

      case 'setState':
        this.setState({
          newOrchardData: {
            ...this.state.newOrchardData,
            ...parr.payload
          },
        })
        break;
      default:
    }
  }
  
  submitStepForm = (step) => {
    const {
      steps,
      name,
      fruitType,
      fruitVariety,
      treesAge,
      treesNum,
      firstBloomDate,
      selectedFirstBloomDate,
      anticipatedHarvestTime,
      selectedAnticipatedHarvestTime,
      sizeClassCustomLabels
    } = this.state
    // this.forceUpdate();
    console.log('validatoer', this.validator, this.validator.allValid())

    if (this.validator.allValid()) {
      steps[step].data = {
        name,
        fruitType,
        fruitVariety,
        treesAge,
        treesNum,
        firstBloomDate,
        selectedFirstBloomDate,
        anticipatedHarvestTime,
        selectedAnticipatedHarvestTime,
        sizeClassCustomLabels
      }

      this.setState({
        steps,
        activeStep: step + 1
      })

      if (step === 2) {
        //final step so final submit
        let newOrchardData = this.state.newOrchardData
        this.props.onSubmit(newOrchardData)
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  
  onSelectUser = (userData) => {
    const {
      steps,
      newOrchardData,
    } = this.state

    steps[2].data = userData
    if (userData) {
      this.setState({
        steps,
        newOrchardData: {
          ...newOrchardData,
          user: userData.value
        }
      })
    }
  }
  
  onSelectGroupOrFarm = (value, isGroup) => {
    if (!isGroup) {
      this.setState({
        newOrchardData: {
          ...this.state.newOrchardData,
          farm: value.value
        },
      })
    }
  }
  
  groupGroupsAndFarmsOptions = () => {
    const {
      groupsFarmsOrchards
    } = this.state
  
    let options = []
    
    if(groupsFarmsOrchards && groupsFarmsOrchards.data && groupsFarmsOrchards.data.length){
      groupsFarmsOrchards.data.forEach((group) => {
        if(group.id) {
          let newGroup = {
            value: group.id,
            label: group.name
          }
          
          if(group.farms && group.farms.length) {
            let groupFarms = []
            group.farms.forEach((farm) => {
              const farmObj = {
                value: farm.id,
                label: farm.farmName
              }
              
              groupFarms.push(farmObj)
            })
            
            if(groupFarms.length){
              newGroup.children = groupFarms
            }
          }
  
          options.push(newGroup)
        }
      })
    }
    
    return options
  }
  
  renderSteps = () => {
    const {
      steps,
      activeStep
    } = this.state

    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-flex uk-flex-center steps-navigation uk-width-2-3'>
          <div className='navigation uk-width-1-1'>
            <div className="labels uk-flex uk-flex-center uk-flex-row uk-flex-between">
              {steps && steps.map((step, index) => {
                const {
                  key,
                  label,
                  status
                } = step
                return (
                  <div className={`uk-flex uk-flex-middle uk-width-1-3 step ${activeStep === index ? 'active' : ''} ${activeStep.data && Object.values(activeStep.data).length ? 'completed' : ''}`} key={`step-${key}`}>
                    <p>{label}</p>
                    <span className='divider uk-width-expand'></span>
                  </div>
                )
              })}
            </div>
            <ul className='uk-dotnav uk-flex uk-flex-center'>
              {steps && steps.map((step, index) => {
                const {
                  key
                } = step
                return (
                  <li className={`step ${activeStep === index ? 'uk-active' : ''} ${activeStep.data && Object.values(activeStep.data).length ? 'completed' : ''}`} key={`step-${key}`}><span></span></li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
  renderStep2() {
    const {
      intl: {
        messages
      },
    } = this.props

    return (
      <div className='uk-flex uk-flex-center'>
        <div className='add-form uk-flex uk-flex-column uk-width-1-1' action="" name="">
          <div className='elements-group uk-flex uk-flex-column'>
            <div className='uk-grid-colapse'>
              <div className='location-title form-group uk-width-1-1 uk-child-width-1-1 uk-flex uk-flex-middle'>
                <h1 className='subtitle'>{messages.add_orchard.findLocationTitle}</h1>
              </div>
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-1 uk-flex uk-flex-middle">
                <p className='instructions'>
                  <span>{messages.add_orchard.findLocationSubtitle1}</span>
                  <span>{messages.add_orchard.findLocationSubtitle2}</span>
                </p>
              </div>
            </div>

            <div className='uk-grid-colapse'>
              <PXGoogleMap
                onAction={this.handleAction}
                newOrchardData={this.state.newOrchardData}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStep3() {
    const {
      intl: {
        messages
      },
    } = this.props

    const users = [...this.state.users]
    const groupsFarmsOrchardsOptions = this.groupGroupsAndFarmsOptions()
    
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='add-form uk-flex uk-flex-column uk-width-1-1' action="" name="">
          <div className='elements-group uk-flex uk-flex-column'>
            <div className='uk-grid-colapse'>
              <div className='location-title form-group uk-width-1-1 uk-child-width-1-1 uk-flex uk-flex-middle'>
                <h1 className='subtitle'>{messages.add_orchard.administrationTitle}</h1>
              </div>
            </div>

            <PXSelectUser
              data={users}
              required={true}
              inviteNewUser={true}
              isMultiple={false}
              validator={this.validator}
              onSelectUser={this.onSelectUser}
              label={messages.add_orchard.assigned_farmer}
              newOrchardData={this.state.newOrchardData}
            />
  
            <PXCustomDropDown
              data={groupsFarmsOrchardsOptions}
              label={messages.add_orchard.assigned_group_farm}
              onSelect={this.onSelectGroupOrFarm}
            />
          </div>
  
  
          
          <div className='uk-flex uk-flex-center'>
            <div className='button-holder uk-width-1-4@s uk-width-1-1 uk-text-center'>
              <div className='btns' onClick={() => this.submitStepForm(2)}>{messages.add_orchard.finish}</div>
              <div className='link'
                onClick={() => {
                  this.setState({
                    activeStep: 1
                  })
                }}
              >
                {messages.add_orchard.cancel}
              </div>
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
    } = this.props

    const {
      steps,
      activeStep,
      loadingUsers,
      loadingGroups,
    } = this.state
  
    if (loadingUsers || loadingGroups) {
      return <div className="spinner-holder"><Logo /><div className='spinner'></div></div>
    }
    
    return (
      <div className='form-holder'>
        <div className='section-header'>{messages.add_orchard.title}</div>

        {steps && this.renderSteps()}

        {activeStep === 0
          && <StepCollectString
            onAction={this.handleAction}
            validator={this.validator}
            newOrchardData={this.state.newOrchardData}
          />}

        {activeStep === 1 && this.renderStep2()}

        {activeStep === 2 && this.renderStep3()}
      </div>
    )
  }
}

PXAddOrchard.propTypes = {
  onSubmit: PropTypes.func
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllUsers: getAllUsersRedux,
  getAllGroupsFarmsOrchards: getAllGroupsFarmsOrchardsRedux,
}, dispatch)

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXAddOrchard))