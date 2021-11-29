import React from 'react'

import Chart from 'react-apexcharts'

export default function Donut() {

    const state = {
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
  }

    return (
        <div className="cContent">
            <Chart options={state.options} series={state.series} type="donut" width={400} height={280} />
        </div>
    )
}
