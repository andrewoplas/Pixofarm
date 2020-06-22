import React from 'react'
import { PXListing } from '../../components/_common'
import { CORPORATES } from '../../utils/constants'
import axios from 'axios'

class PXCorporates extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      users: [],
      loading: false
    }
  }
  
//   componentDidMount() {
//     this.fetchCorporates();
//   }
  
//   fetchCorporates() {
//     this.setState({loading: true})
    
//     axios
//       .get("https://jsonplaceholder.typicode.com/users")
//       .then(response => {
//         const newCorporates = response.data.map(c => {
//           return {
//             id: c.id,
//             name: c.name,
//             email: c.email,
//             phone: c.phone
//           };
//         });
//         const newState = Object.assign({}, this.state, {
//           corporates: newCorporates
//         });
//         this.setState(
//           newState,
//         )
//         this.setState({loading: false})
//       })
//       .catch(error => console.log(error));
//   }
  
  renderListingTable() {
    const {
      intl: {
        messages
      }
    } = this.props
    
    const {
      loading,
      corporates=CORPORATES
    } = this.state
    
    const corporateActions = [
      {
        key: `edit`,
        label: messages.listing.actions.edit
      },
      {
        key: `suspend`,
        label: messages.listing.actions.suspend
      },
      {
        key: `reassign`,
        label: messages.listing.actions.reassign
      }
    ]

    const listHead = [
      {
        key: `name`,
        label: messages.list_header.corporateName,
        sortable: true,
        order: 'asc'
      },
      {
        key: `country`,
        label: messages.list_header.country,
        sortable: true,
        order: 'asc'
      },
      {
        key: `fruitType`,
        label: messages.list_header.fruitType,
        sortable: true,
        order: 'asc'
      },
      {
        key: `orchadsSize`,
        label: messages.list_header.orchadsSize,
        sortable: true,
        order: 'asc'
      },
      {
        key: `users`,
        label: messages.list_header.users,
        sortable: true,
        order: 'asc'
      },
      {
        key: `orchads`,
        label: messages.list_header.orchads,
        sortable: true,
        order: 'asc'
      },
      {
        key: `status`,
        label: messages.list_header.status,
        sortable: true,
        order: 'asc'
      }
    ]
    return (
      <PXListing
        data={corporates}
        mappingObj={listHead}
        mappingActions={corporateActions}
        fullTextSearch={true}
      />
    )
  }
  
  render() {
    const {
      loading
    } = this.state
    
    return (
      <section className='page corporates full-height with-bkg'>
        <section className='uk-container'>
          {!loading && this.renderListingTable()}
        </section>
      </section>
    )
  }
}

export default (PXCorporates)