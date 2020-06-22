import React from 'react'
import { injectIntl } from 'react-intl'

class ComponentFilter extends React.Component {
    constructor(props) {
        super(props)
        const {
            filtertype,
            filtervariety
        } = this.props
        this.state = {
            filtertype: filtertype,
            filtervariety: filtervariety,
        }
    }
    componentDidUpdate(prevProps) {
        const {
            filtertype,
            filtervariety
        } = this.props
        if (prevProps && (prevProps.filtertype !== this.props.filtertype || prevProps.filtervariety !== this.props.filtervariety)) {
            // console.log('ComponentFilter componentDidUpdate', this.props)
            this.setState({
                filtertype: filtertype,
                filtervariety: filtervariety
            })
        }
    }
    onApply = () => {
        this.props.onAction({
            type: 'setState',
            payload: {
                filtertype: this.state.filtertype,
                filtervariety: this.state.filtervariety
            }
        })
        this.megamenuAction('hide')
    }
    onCancel = () => {
        this.setState({
            filtertype: this.props.filtertype,
            filtervariety: this.props.filtervariety
        })
        this.megamenuAction('hide')
    }
    onTypeChange = (type) => {
        const {
            filtervarietybyid,
        } = this.props
        const {
            filtervariety
        } = this.state
        let varietys = Object.values(filtervarietybyid).filter(variety => variety.parent === type.value)
        let varietyActive = filtervariety
        if (varietys.length && varietys.filter(variety => variety.value === varietyActive).length === 0) {
            varietyActive = varietys[0].value
        }
        this.setState({
            filtertype: type.value,
            filtervariety: varietyActive,
        })
    }
    megamenuAction = (action) => {
        let element = document.querySelector('.filtermegaaction')
        switch (action) {
            case 'hide':
                window.UIkit.dropdown(element).hide(false)
                break;
            default:
        }
    }
    SectionType = () => {
        const {
            filtertypebyid,
        } = this.props
        const {
            filtertype,
        } = this.state
        return (
            <div className='secondary-items uk-width-1-3 uk-flex uk-flex-right'>
                <ul className='uk-flex uk-flex-column'>
                    <h4 className=''>
                        Fruit type
                </h4>
                    {Object.values(filtertypebyid).map(type => {
                        return (
                            <li
                                key={'filterType_' + type.value}
                                className={`${type.value === filtertype ? '' : ''} item uk-width-1-1`}
                                onClick={() => { this.onTypeChange(type) }}
                            >
                                {type.label}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    SectionVariety = () => {
        const {
            filtervarietybyid,
        } = this.props
        const {
            filtertype,
            filtervariety
        } = this.state
        let varietys = Object.values(filtervarietybyid).filter(variety => variety.parent === filtertype)
        return (
            <div className='main-items uk-width-2-3 uk-column-1-3'>
                <ul className='uk-flex uk-flex-column main-items-list'>
                    {varietys.map(variety => {
                        return (
                            <li
                                key={'filterVariety_' + variety.value}
                                className={`${variety.value === filtervariety ? '' : ''} item uk-width-1-1`}
                                onClick={() => {
                                    this.setState({
                                        filtervariety: variety.value
                                    })
                                }}
                            >
                                <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                                    <span className='name'>{variety.label}</span>
                                    <span className='qty'>(156 Tons)</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    render() {
        const {
            filtervarietybyid
        } = this.props


        return (
            <div className='mega-menu uk-flex uk-flex-right'>
                <a className='mega-open' type='button'>More({Object.keys(filtervarietybyid).length}) <span uk-icon='icon: chevron-down'></span></a>
                <div className='mega-container filtermegaaction' uk-dropdown='mode: click; pos: bottom-left; animation: uk-animation-slide-top-small'>
                    <div className='uk-container'>
                        <div className='uk-flex uk-flex-wrap'>

                            <this.SectionVariety />

                            <this.SectionType />

                            <div className='button-holder uk-width-1-1 uk-flex uk-flex-middle'>
                                <a
                                    className='btns uk-width-1-3@m uk-width-1-1'
                                    onClick={this.onApply}
                                >
                                    Apply filters
                                </a>
                                <a
                                    className='uk-width-1-6@m uk-width-1-1 uk-text-center'
                                    onClick={this.onCancel}
                                >
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default injectIntl(ComponentFilter)