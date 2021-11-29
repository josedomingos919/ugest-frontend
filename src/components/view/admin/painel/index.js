import React from 'react'

import Bar from '../../../layout/chart/bar'
import Donut from '../../../layout/chart/donut'
import Area from '../../../layout/chart/area'

export default function Painel() {
    return (
        <div className="painelContainer">
            <div className="cardTimeContainer">
                <div>
                  <Donut />
                </div>
                <div>
                  <Bar />
                </div>
                <div>3</div>
            </div>
            <div style={{
          marginBottom: '8rem'
        }} className="cardTimeContainer">
                <div><Area/></div>
                <div><Bar /></div>
            </div>
        </div>
    )
}
