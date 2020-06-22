import React from 'react'
import { injectIntl } from "react-intl";

import ComponentAreaChartSmall from './componentAreaChartSmall'

class SectionChartHistory extends React.Component {
    render() {
        const {
            intl: {
                messages
            },
            stroke,
            areaColor,
        } = this.props
        const chartHeight = 150
        const chartData = [
            {
                "name": "Page A",
                "uv": 4000,
                "pv": 2400,
                "amt": 25
            },
            {
                "name": "Page B",
                "uv": 3000,
                "pv": 1398,
                "amt": 45
            },
            {
                "name": "Page C",
                "uv": 2000,
                "pv": 9800,
                "amt": 56
            },
            {
                "name": "Page D",
                "uv": 2780,
                "pv": 3908,
                "amt": 65
            },
            {
                "name": "Page E",
                "uv": 1890,
                "pv": 4800,
                "amt": 30
            },
            {
                "name": "Page F",
                "uv": 2390,
                "pv": 3800,
                "amt": 25
            },
            {
                "name": "Page G",
                "uv": 3490,
                "pv": 4300,
                "amt": 10
            }
        ]
        return (
            <div className='weather-details'>
                <div className='weather-summary uk-flex uk-flex-middle'>
                    <h2 className='title'>{messages.orchad.headings.sHistory}</h2>
                </div>
                <div className='uk-flex uk-flex-wrap uk-child-width-1-4@m uk-child-width-1-2'>
                    <div className='component-chart-historical'>
                        <ComponentAreaChartSmall
                            chartData={chartData}
                            dataKey='amt'
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                        />
                    </div>
                    <div className='component-chart-historical'>
                        <ComponentAreaChartSmall
                            chartData={chartData}
                            dataKey='amt'
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                        />
                    </div>
                    <div className='component-chart-historical'>
                        <ComponentAreaChartSmall
                            chartData={chartData}
                            dataKey='amt'
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                        />
                    </div>
                    <div className='component-chart-historical'>
                        <ComponentAreaChartSmall
                            chartData={chartData}
                            dataKey='amt'
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                        />
                    </div>
                </div>
                <div className='uk-flex uk-flex-column uk-flex-center under-chart'>
                    <div className='uk-flex uk-child-width-1-5'>
                        <div className='label'>{messages.orchad.headings.date}</div>
                        <div className='label'>{messages.orchad.details.averageDiameter}</div>
                        <div className='label'>{messages.orchad.details.predictedDiameter}</div>
                        <div className='label'>{messages.orchad.details.growthRate}</div>
                        <div className='label'>{messages.orchad.details.forecastProduction}</div>
                    </div>
                    <div className='uk-flex uk-child-width-1-5'>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                    </div>
                    <div className='uk-flex uk-child-width-1-5'>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                    </div>
                    <div className='uk-flex uk-child-width-1-5'>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                        <div className='value'>{'--'}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default injectIntl(SectionChartHistory)