import React from 'react'
import { injectIntl } from "react-intl";

class ComponentSizeLabel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: {}
        }
        // console.log('ComponentSizeLabel constructor', this.props, this.state)
    }
    componentDidMount() {
        if (this.props.data) {
            let items = {}
            let key = 0
            for (let datai in this.props.data) {
                let data = this.props.data[datai]
                if (typeof (data['name']) !== 'undefined') {
                    items['key_' + key] = {
                        key: key,
                        name: data['name'],
                        from: data['from'],
                        to: data['to'],
                    }
                    key++
                }
            }
            this.setState({
                items: items
            })
        }
    }
    parentUpdate = (items) => {
        let parentItems = []
        Object.values(items).map(item => {
            parentItems.push({
                name: item.name,
                from: item.from,
                to: item.to,
            })
        })
        this.props.onAction({
            type: 'inputchange',
            payload: {
                name: 'sizeClasses',
                value: [...parentItems],
            }
        })
    }
    onAdd = (newKey) => {
        let items = { ...this.state.items }
        items['key_' + newKey] = {
            key: newKey,
            name: '',
            from: '',
            to: '',
        }
        this.setState({
            items: items
        })
        this.parentUpdate(items)
    }
    onChange = (e, key) => {
        let items = { ...this.state.items }
        items['key_' + key][e.target.name] = e.target.value
        this.setState({
            items: items
        })
        this.parentUpdate(items)
    }
    onRemove = (data) => {
        let items = { ...this.state.items }
        delete items['key_' + data.key]
        this.setState({
            items: items
        })
        this.parentUpdate(items)
    }

    render() {
        const {
            intl: {
                messages
            },
            validator,
        } = this.props
        const data = this.state.items
        let latestKey = 0
        // validator.purgeFields();
        return (
            <div className="uk-grid-colapse">
                {Object.values(data).map((sizeClass) => {
                    const {
                        key,
                        name,
                        from,
                        to,
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
                                        onChange={(e) => this.onChange(e, key)}
                                    />
                                    {validator.message('name', name, 'required')}
                                </div>

                                <label htmlFor='from'>{messages.add_size_class.from}</label>
                                <div className="uk-flex uk-flex-column">
                                    <input
                                        type="number"
                                        name="from"
                                        className="form-control"
                                        value={from}
                                        placeholder={messages.add_size_class.from}
                                        onBlur={() => validator.showMessageFor('from')}
                                        onChange={(e) => this.onChange(e, key)}
                                    />
                                    {validator.message('from', from, 'required')}
                                </div>

                                <label htmlFor='to'>{messages.add_size_class.to}</label>
                                <div className="uk-flex uk-flex-column">
                                    <input
                                        type="number"
                                        name="to"
                                        className="form-control"
                                        value={to}
                                        placeholder={messages.add_size_class.to}
                                        onBlur={() => validator.showMessageFor('to')}
                                        onChange={(e) => this.onChange(e, key)}
                                    />
                                    {validator.message('to', to, 'required')}
                                </div>

                                <span className="delete" onClick={() => this.onRemove(sizeClass)}><span uk-icon="icon: close; ratio: 1.5"></span></span>
                            </div>


                        </div>
                    )
                })}
                <div className="input-holder form-group uk-width-1-1 uk-child-width-1-4 uk-flex uk-flex-middle">
                    <label
                        className='add-label'
                        onClick={() => this.onAdd(latestKey + 1)}
                    >
                        {messages.add_size_class.add_label}
                    </label>
                </div>
            </div>
        )
    }
}

export default injectIntl(ComponentSizeLabel)
