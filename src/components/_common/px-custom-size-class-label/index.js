import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl";

class PXCustomSizeClassLabel extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onChange: PropTypes.func,
    validator: PropTypes.object,
  }
  
  
  
  render() {
    const {
      intl:{
        messages
      },
      data,
      onRemove,
      onAdd,
      onChange,
      validator,
    } = this.props
    
    let latestKey = 0
    return (
      <div className="uk-grid-colapse">
        {data.map((sizeClass) => {
          const {
            key,
            name,
            from,
            to,
            canBeDeleted
          } = sizeClass
          
          latestKey = key
          return (
            <div key={`class-label-${key}`} className="input-holder form-group uk-width-1-1 uk-child-width-1-1 uk-flex uk-flex-middle">
              <div className="form-group uk-width-1-1 uk-flex uk-flex-middle custom-size">
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    placeholder={messages.add_size_class.name}
                    onBlur={() => validator.showMessageFor('name')}
                    onChange={(e) => onChange(e, key)}
                  />
                  {validator.message('name', name, 'required')}
                </div>
                <label htmlFor='from'>{messages.add_size_class.from}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="from"
                    className="form-control"
                    value={`${from} mm`}
                    placeholder={messages.add_size_class.from}
                    onBlur={() => validator.showMessageFor('from')}
                    onChange={(e) => onChange(e, key)}
                  />
                  {validator.message('from', from, 'required')}
                </div>
                <label htmlFor='from'>{messages.add_size_class.to}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="to"
                    className="form-control"
                    value={`${to} mm`}
                    placeholder={messages.add_size_class.to}
                    onBlur={() => validator.showMessageFor('to')}
                    onChange={(e) => onChange(e, key)}
                  />
                  {validator.message('to', to, 'required')}
                </div>
                {canBeDeleted && <span className="delete" onClick={() => onRemove(sizeClass)}><span uk-icon="icon: close; ratio: 1.5"></span></span>}
              </div>
              
              
            </div>
          )
        })}
        <div className="input-holder form-group uk-width-1-1 uk-child-width-1-4 uk-flex uk-flex-middle">
          <label className='add-label' onClick={() => onAdd(latestKey + 1)}>{messages.add_size_class.add_label}</label>
        </div>
      </div>
    )
  }
}

export default injectIntl(PXCustomSizeClassLabel)
