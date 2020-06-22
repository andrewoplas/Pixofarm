import React from 'react'
import { injectIntl } from 'react-intl'
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, Label, LabelList } from 'recharts';

class Section2 extends React.Component {
    constructor(props) {
        super(props)
        this.chartData = [
            {
                "name": "Jam fruits",
                "amt": 5
            },
            {
                "name": "Juice",
                "amt": 25
            },
            {
                "name": "Market",
                "amt": 56
            },
            {
                "name": "Market supply",
                "amt": 27
            },
            {
                "name": "Premium",
                "amt": 12
            },
        ]
    }
    renderLabel = (props) => {
        const { x, y, index, height, value } = props;
        if (!props || !props.content) return
        let data = this.chartData[index]
        // console.log(props, data)
        return (<g>
            <text x={x} y={y - 20} fill="#00000" textAnchor="middle" dominantBaseline="middle">
                {data.name}
            </text>
            <text x={x} y={y} fill="#00000" textAnchor="middle" dominantBaseline="middle">
                {data.amt} Tons
            </text>

        </g>)

    }

    render() {
        const {
            intl: {
                messages
            },
        } = this.props
        const stroke = 'transparent'
        const areaColor = '#1B87C3'
        return (
            <section className='chart-area'>
                <div className='uk-flex uk-flex-bottom'>
                    <div className='uk-flex uk-flex-middle'>
                        <h1 className='title'>{messages.PXCorporateDetails.titleSizeclassdistribution}</h1>
                    </div>
                </div>
                <ResponsiveContainer width='100%' height={200}>
                    <AreaChart
                        data={this.chartData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='0%' stopColor={areaColor} stopOpacity={0.15} />
                                <stop offset='50%' stopColor={areaColor} stopOpacity={0.1} />
                                <stop offset='95%' stopColor={areaColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type='natural' dataKey='amt' stroke={stroke} fillOpacity={1} fill='url(#colorUv)'>
                            <LabelList content={this.renderLabel} />
                        </Area>
                    </AreaChart>
                </ResponsiveContainer>
            </section>
        )
    }
}
export default injectIntl(Section2)