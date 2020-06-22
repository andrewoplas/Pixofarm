import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, LabelList } from 'recharts';
import { injectIntl } from "react-intl";

class PXAreaChart extends React.Component {
  render() {
    const {
      chartData,
      height,
      areaColor,
      stroke,
      dataKey,
      labelKey,
      description,
    } = this.props

    return (
      <ResponsiveContainer width='100%' height={height}>
        <AreaChart data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor={areaColor} stopOpacity={0.15} />
              <stop offset='50%' stopColor={areaColor} stopOpacity={0.1} />
              <stop offset='95%' stopColor={areaColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type='natural' dataKey={dataKey} stroke={stroke} fillOpacity={1} fill='url(#colorUv)'>
            <LabelList dataKey={labelKey} position='top' offset={30} />
            {description && <LabelList dataKey={description} position='bottom' offset={0} />}
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default injectIntl(PXAreaChart)