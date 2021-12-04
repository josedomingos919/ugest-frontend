import React, { createRef, Component } from 'react'

import ComponentToPrint from './paper'

import ReactToPrint from 'react-to-print'

class Report extends Component {
  btnPrint = createRef()

  render() {
    return <>Test87654</>
  }
}

export default Report

/*
 render() {
        return (
            <div className="reportContainer">
                <div>
                    <button onClick={() => {
                        this.btnPrint.current.click()
                    }}>
                        <i className="fa fa-print" />Imprimir
                    </button>
                    <button>
                        <i className="fa fa-times" />Cancel
                    </button>
                    <button>
                        <i className="fa fa-save" />Salvar
                    </button>
                </div>
                <div>
                <ReactToPrint
                    trigger={() => <button ref={this.btnPrint} hidden>Print this out!</button>}
                    content={() => this.componentRef}
                    />
                    <ComponentToPrint children={this.props?.children} ref={(el) => (this.componentRef = el)}/>
                </div>
            </div>
        )
    } 
*/
