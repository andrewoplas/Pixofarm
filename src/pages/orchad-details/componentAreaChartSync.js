import React from 'react'
import { injectIntl } from "react-intl";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, LabelList } from 'recharts';

class ComponentAreaChartSync extends React.Component {
    render() {
        const {
            height,
            chartData,
            syncId,
            areaColor,
            stroke,
            dataKey,
        } = this.props
        const labeltopInterval = this.props.labeltopInterval||0
        return (
            <ResponsiveContainer width='100%' height={height}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    syncId={syncId}
                >
                    <defs>
                        <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor={areaColor} stopOpacity={0.15} />
                            <stop offset='50%' stopColor={areaColor} stopOpacity={0.1} />
                            <stop offset='95%' stopColor={areaColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {this.props.labeltop &&
                        <XAxis
                            xAxisId="customid"
                            orientation="top"
                            dataKey={this.props.labeltop}
                            interval={labeltopInterval}
                            axisLine={false}
                            height={1}
                        />
                    }
                    <XAxis
                        tick={() => <><div>o</div></>}
                    />
                    {this.props.tooltip &&
                        <Tooltip content={this.props.tooltip} />
                    }
                    <Area type='natural' dataKey={dataKey} stroke={stroke} fillOpacity={1} fill='url(#colorUv)'>
                    </Area>
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}
export default injectIntl(ComponentAreaChartSync)