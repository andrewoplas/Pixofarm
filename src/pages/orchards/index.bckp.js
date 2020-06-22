import React from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import OrchardListComponent from '../../components/list-orchards'
import * as actionsOrchard from "../../redux/orchard/actions"

class OrchardList extends React.Component {

    componentDidMount() {
        this.props.orchardListGet()
    }

    render() {
        return (
            <OrchardListComponent
                orchardList={this.props.orchardList}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        orchardList: state.orchard.orchardList
    }
}

const mapDispatchToProps = dispatch => ({

    orchardListGet: data => dispatch(actionsOrchard.orchardListGet(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrchardList)))