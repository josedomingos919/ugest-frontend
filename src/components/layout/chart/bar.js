import React from 'react'

import Chart from 'react-apexcharts'

export default function Bar() {

    const state = {
        options: {
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 35, 50]
        }]
      }

    return (
        <div className="cContent">
            <Chart options={state.options} series={state.series} type="bar" width={400} height={280} />
        </div>
    )
}
