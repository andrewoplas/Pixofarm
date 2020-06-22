import React from 'react'

class PXDropDown extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    console.log('PXDROPDOWN UPDATE')
    console.log(this.props.selectedValue)
  }

  render() {
    const {
      data,
      handleChange,
      selectedValue
    } = this.props


    return (
      <select onChange={handleChange} value={selectedValue}>
        <option value=''>-</option>
        {Object.keys(data).map(key => <option value={key}>{key}</option>)}
      </select>
    )
  }
}

export default PXDropDown