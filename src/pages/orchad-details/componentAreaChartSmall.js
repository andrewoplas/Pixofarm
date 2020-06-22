import React from 'react'
import { injectIntl } from "react-intl";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, LabelList } from 'recharts';

class ComponentAreaChartSmall extends React.Component {
    render() {
        const {
            height,
            chartData,
            areaColor,
            stroke,
            dataKey,
        } = this.props
        return (
            <ResponsiveContainer width='100%' height={height}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor={areaColor} stopOpacity={0.15} />
                            <stop offset='50%' stopColor={areaColor} stopOpacity={0.1} />
                            <stop offset='95%' stopColor={areaColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis />
                    <YAxis />
                    <Area type='natural' dataKey={dataKey} stroke={stroke} fillOpacity={1} fill='url(#colorUv)'>
                    </Area>
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}
export default injectIntl(ComponentAreaChartSmall)