import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import PXListingRow from './px-listing-row'
import PXListingHead from './px-listing-head'
import { MIN_LISTING_TEXT_SEARCH_LNGTH } from '../../../utils/constants'

class PXListing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data || [],
      filteredGroupData: this.props.data || [],
      allData: this.props.data || [],
      mappingObj: this.props.mappingObj || [],
      mappingActions: this.props.mappingActions || [],
      mappingFilterObject: this.props.addFilterObject || [],
      loading: false
    }
  }
  
  sortTable = async (byField) => {
    const {
      data,
      mappingObj
    } = this.state

    this.setState({ loading: true })

    const sortOrder = byField.order === 'asc' ? 'desc' : 'asc'

    /** redo mappingObj in order to set the new order in right col field **/
    if (mappingObj) {
      await Object.values(mappingObj).forEach((obj, idx) => {
        if (obj.key === byField.key && obj.order !== sortOrder) {
          mappingObj[idx].order = sortOrder
          mappingObj[idx].active = true
        } else {
          mappingObj[idx].order = 'asc'
          mappingObj[idx].active = false
        }
      })
    }
    this.setState({ mappingObj: mappingObj })

    //can happen that sometimes we render content of column as html, so we have an alias for which we are sprting
    const sortBy = byField.aliasFor ? byField.aliasFor : byField.key
    
    //sort type represent the sorting type - integer or string
    const sortType = byField.sortType ? byField.sortType: 'string'
    
    let newData = []
    
    /** check and see if there are any children in the provided data and sort them */
    let children = data.filter(item => item.hasOwnProperty('children'));
    if (!children || !children.length) {
      /** now we sort the data array by key with sort order **/
      if (sortOrder === 'asc') {
        if (sortType && sortType === 'string') {
          newData = Object.values(data).sort((a, b) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1)
        } else {
          newData = Object.values(data).sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
        }
      } else {
        if (sortType && sortType === 'string') {
          newData = Object.values(data).sort((a, b) => a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1)
        } else {
          newData = Object.values(data).sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
        }
      }
    } else {
      data.map(item => {
        if (item.hasOwnProperty('children')) {
          if (sortOrder === 'asc') {
            if (sortType && sortType === 'string') {
              item['children'] = Object.values(item.children).sort((a, b) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1)
            } else {
              item['children'] = Object.values(item.children).sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
            }
          } else {
            if (sortType && sortType === 'string') {
              item['children'] = Object.values(item.children).sort((a, b) => a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1)
            } else {
              item['children'] = Object.values(item.children).sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
            }
          }
        }
      })
      newData = data;
    }
    
    this.setState({
      data: newData,
      loading: false
    })
  }

  fullTextSearch = async (value) => {
    const {
      data,
      loading
    } = this.state

    let newData = []

    if (value.length >= MIN_LISTING_TEXT_SEARCH_LNGTH) {
      this.setState({
        loading: true
      })

      await Object.values(data).forEach((item) => {
        if (item.children) {
          Object.values(item.children).forEach((children) => {
            Object.values(children).forEach((item1) => {
              if (item1 && item1.toString().toLowerCase().indexOf(value) > -1) {
                newData.push(item)
              }
            })
          })
        } else {
          Object.values(item).forEach((item1) => {
            if (item1 && item1.toString().toLowerCase().indexOf(value) > -1) {
              newData.push(item)
            }
          })
        }
      })

      this.setState({
        data: newData,
        loading: false
      })
    }

    if (!value.length) {
      this.setState({
        data: this.props.data
      })
    }
  }

  onKeyDown = (e) => {
    if (e.keyCode === 8) {
      this.setState({
        data: this.props.data
      })
    }
  }

  sortTableByExt = async (colKey) => {
    const {
      mappingObj,
    } = this.props

    const [selected] = Object.values(mappingObj).filter((obj) => obj.key === colKey)
    if (selected && selected.sortable) {
      await this.sortTable(selected)
    }
  }
  
  filterByGroup = async (parentKey, childrenKey) => {
    const {
      allData,
      mappingFilterObject
    } = this.state
    
    if (childrenKey === 'all') {
      this.setState({
        data: allData,
        filteredGroupData: allData,
      })
    } else {
      const filteredGroups = await allData.filter((group) => group.id === childrenKey)
      this.setState({
        data: filteredGroups,
        filteredGroupData: filteredGroups,
      })
    }
  
    let newMappingFilterObject = []
    await mappingFilterObject.forEach(async (filterObj) => {
      if(filterObj.key === parentKey) {
        await filterObj.children.forEach((child) => {
          if(child.key === childrenKey) {
            child.active = true
          } else {
            child.active = false
          }
        })
      }
      newMappingFilterObject.push(filterObj)
    })
  
    this.setState({mappingFilterObject: newMappingFilterObject})
  }
  
  filterOrchardsByStatus = async (parentKey, childrenKey) => {
    let {
      filteredGroupData,
      mappingFilterObject
    } = this.state
    
    if (childrenKey === 'all') {
      this.setState({
        data: filteredGroupData,
      })
    } else {
      let filteredGroups = []
      
      await filteredGroupData.forEach(async (group) => {
        let newGroup = {
          id: group.id,
          name: group.name,
        }
        if (group.children) {
          let groupChildren = []
          await group.children.forEach((orchard) => {
            if(childrenKey === 'active' && orchard.isActive === true) {
              groupChildren.push(orchard)
            }
            if(childrenKey === 'inactive' && orchard.isActive === false) {
              groupChildren.push(orchard)
            }
          })

          if (groupChildren && groupChildren.length) {
            newGroup.children = groupChildren
            filteredGroups.push(newGroup)
          }
        } else {
          if(childrenKey === 'active' && group.isActive === true) {
            filteredGroups.push(group)
          }
          if(childrenKey === 'inactive' && group.isActive === false) {
            filteredGroups.push(group)
          }
        }
      })

      this.setState({
        data: filteredGroups
      })
    }
    
    let newMappingFilterObject = []
    await mappingFilterObject.forEach(async (filterObj) => {
      if(filterObj.key === parentKey) {
        await filterObj.children.forEach((child) => {
          if(child.key === childrenKey) {
            child.active = true
          } else {
            child.active = false
          }
        })
      }
      newMappingFilterObject.push(filterObj)
    })
    
    this.setState({mappingFilterObject: newMappingFilterObject})
  }
  
  render() {
    const {
      fullTextSearch,
      sortObject,
      intl: {
        messages
      },
      addFilterObject
    } = this.props

    const {
      data,
      mappingObj,
      mappingActions,
    } = this.state
    
    return (
      <div className='list'>
        <div className="sorting-area uk-flex uk-flex-row uk-flex-right uk-flex-center">
          {fullTextSearch && <div className='search sort-item uk-flex uk-flex-middle'>
            <a type='button'><span uk-icon="search"></span></a>
            <div uk-dropdown='mode: click; pos: left-center; animation: uk-animation-slide-right-small' className='uk-dropdown'>
              <input type='text' className='search' name='fullTextSearch' onChange={(e) => this.fullTextSearch(e.target.value)} onKeyDown={this.onKeyDown} />
            </div>
          </div>}
          <div className="sorts sort-item uk-flex uk-flex-middle">
            {sortObject && <div type='button' className='button uk-flex uk-flex-row uk-flex-center uk-flex-middle'>{messages.listing.sorting.sortBy}
              {sortObject.length ? (
                <ul className='uk-switcher'>
                  {sortObject.map((obj) => {
                    const [selected] = Object.values(mappingObj).filter((obj1) => obj1.key === obj.key)
                    return (<li key={`obj-${obj.key}`} onClick={() => this.sortTableByExt(obj.key)} className={`${selected.active ? 'active uk-active' : ''} ${selected.order}`}>{obj.label}</li>)
                  })}
                </ul>
              ) : null}
              <span className='indicator' uk-icon="chevron-down"></span>
            </div>}
            
            <div uk-dropdown='mode: click; animation: uk-animation-slide-top-small' className='uk-dropdown uk-dropdown-bottom-left'>
              {sortObject && sortObject.length ? (
                <ul className="sort-obj" uk-switcher='true'>
                  {sortObject.map((obj) => {
                    const [selected] = Object.values(mappingObj).filter((obj1) => obj1.key === obj.key)
                    return (<li key={`obj-${obj.key}`} onClick={() => this.sortTableByExt(obj.key)} className={`uk-flex uk-flex-middle ${selected.active ? 'active uk-active' : ''} ${selected.order}`}><a href='#'>{messages.listing.sorting.sortBy} {obj.label}</a><span uk-icon="arrow-up"></span></li>)
                  })}
                </ul>
              ) : null
              }
            </div>
          </div>
  
          {addFilterObject && addFilterObject.map((addFilter, idx) => {
            const defaultValue = addFilter.children.filter((fil) => fil.active === true)
            return (
              <div key={`add-filter-${idx}`} className="sorts sort-item uk-flex uk-flex-middle">
                {addFilter && <div type='button' className='button uk-flex uk-flex-row uk-flex-center uk-flex-middle'>{defaultValue.label}
                  {addFilter.children.length ? (
                    <ul className='uk-switcher'>
                      {addFilter.children.map((obj, idx1) => {
                        return (
                          <li
                            key={`obj-${obj.key}-${idx1}`}
                            className={`${obj.active ? 'active uk-active' : ''}`}
                          >
                            {obj.label}
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
                  <span className='indicator' uk-icon="chevron-down"></span>
                </div>}
    
                <div uk-dropdown='mode: click; animation: uk-animation-slide-top-small' className='uk-dropdown uk-dropdown-bottom-left'>
                  {addFilter && addFilter.children.length ? (
                    <ul className="sort-obj" uk-switcher='true'>
                      {addFilter.children.map((obj, idx1) => {
                        return (
                          <li
                            key={`obj-${obj.key}-${idx1}`}
                            onClick={() => this[addFilter.callback](addFilter.key, obj.key)}
                            className={`uk-flex uk-flex-middle ${obj.active ? 'active uk-active' : ''}`}
                          >
                            <a href='#'>{obj.label}</a>
                          </li>
                        )
                      })}
                    </ul>
                  ) : null
                  }
                </div>
              </div>
            )
          })}
        </div>
        <table className="table uk-flex-uk-flex-column uk-width-1-1 uk-text-left">
          <thead>
            <PXListingHead
              mappingObj={mappingObj}
              onSort={this.sortTable}
            />
          </thead>

          <tbody>
            {data.map(u =>
              <PXListingRow
                key={u.id}
                data={u}
                mappingObj={mappingObj}
                mappingActions={mappingActions}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

PXListing.propTypes = {
  data: PropTypes.array,
  mappingObj: PropTypes.array,
  mappingActions: PropTypes.array,
  fullTextSearch: PropTypes.bool,
  sortObject: PropTypes.array,
  addFilterObject: PropTypes.array
}

export default injectIntl(PXListing)