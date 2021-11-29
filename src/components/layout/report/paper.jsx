import React from 'react'

import Logo from '../../../assets/images/logo.png'
import Qr from '../../../assets/images/qr.png'

class Paper extends React.Component {
  render() {
    return (
      <div {...this.props} className="reportContainer--doc">
        <div className="reportContainer--doc--header">
          <div>
            <div>
              <input
                type="file"
                onChange={(e) => {
                  console.log(e)
                }}
                hidden={true}
              />
              <img src={Logo} alt="ugest-logo" />
            </div>
            <div>
              Sistema de faturação
              <p
                style={{
                  color: '#ccc',
                }}
              >
                Infinitus
              </p>
            </div>
          </div>
        </div>
        {this.props?.children}
        <div className="footer">
          <div className="reportContainer--doc--header">
            <div>
              <div>
                <img src={Qr} alt="ugest-logo" />
              </div>
            </div>
            <div>
              <ul
                style={{
                  alignSelf: 'flex-end',
                }}
              >
                <li>
                  <strong className="idStrong">NIF:</strong> 007044ZE044
                </li>
                <li>
                  <strong className="idStrong">TELEFONE:</strong> +244 222458221
                </li>
                <li>
                  <strong className="idStrong">EMAIL:</strong> info@ugest.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Paper
