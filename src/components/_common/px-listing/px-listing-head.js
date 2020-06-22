import React from 'react'
import PropTypes from "prop-types";

class PXListingHead extends React.Component {
  constructor(props) {
    super(props)
  }
  
  onClick = async (colKey) => {
    const {
      mappingObj,
      onSort
    } = this.props
    
    const [selected] = Object.values(mappingObj).filter((obj) => obj.key === colKey)
    if(selected && selected.sortable){
      await onSort(selected)
    }
  }
  
  render() {
    const {
      mappingObj
    } = this.props
    
    return (
      <tr className='uk-flex table-header uk-flex-row uk-flex-wrap uk-child-width-expand uk-flex-middle'>
        {mappingObj && mappingObj.map((head, index) => {
          return (
            <th
              className={`cell ${head.key} ${head.active ? 'active' : ''} ${head.order}`}
              key={`listing-${index}`}
              onClick={() => this.onClick(head.key)}
            >
              {head.label} <span uk-icon="arrow-up"></span>
            </th>
          )
        })}
        <th className='cell actions uk-text-center'>&nbsp;</th>
      </tr>
    )
  }
}

PXListingHead.propTypes = {
  mappingObj: PropTypes.array.isRequired,
  onSort: PropTypes.func
};

export default PXListingHead