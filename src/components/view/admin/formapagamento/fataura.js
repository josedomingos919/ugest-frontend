import React from 'react'
import { Convert } from '../../../../util/money';
import Table from '../../../layout/form/table';

const Fatura = ({
    formValue,
    artigo,
    venda_id,
    shopping
}) => {

    console.log('Fatura need',
        formValue,
        artigo,
        venda_id,
        shopping
    )

    return (
        <div>
        <div className="reportContainer--doc--header">
            <div>
                <div>
                        <h1 style={{
                        margin: 0
                    }}>FATURA</h1>
                </div>
            </div>
            <div>
                <ul>
                    <li><strong className="idStrong">VEND</strong> { venda_id }</li>
                        <li><strong className="idStrong">Data</strong> {new Date().toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                    }) }</li>
                </ul>
          </div>
            </div>
        <div className="sub-cli-info">
        <div>
            <strong className="idStrong">NIF</strong> {formValue?.pessoa?.pes_nif}
        </div>
        <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem 0'
            }}>
            <strong className="idStrong">Cliente</strong> {formValue?.pessoa?.pes_nome}
        </div>
        <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '1rem 0'
            }}>
            <strong className="idStrong">Moeda</strong> Kwanza
        </div>
          </div>
            <div>
            <Table
                    options={{
                    onlyCollumn: []
                    }} 
                    data={artigo}
                    isDoc
                />
        </div>

        <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '1rem 0'
            }}>
            <strong className="idStrong">Troco</strong> {Convert(shopping?.troco)}
        </div>
        
            <div className="vd-p-result-info">
                <div>
                <strong className="idStrong">iliquido</strong> {Convert(shopping?.totalSemIva)}
                </div>
                <div>
                <strong className="idStrong">Montante imp. devido</strong> {Convert(shopping?.imp)}
                </div>
                <div>
                <strong className="idStrong">B.Inc</strong> {Convert(shopping?.totalSemIva)}
                </div>
            </div>
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems:'center'
                }}>
                <h3 className="idStrong">Valor total</h3> {Convert(shopping?.total)}
                </div>
            </div>
        
        {formValue.venda?.ven_descricao && (
          <div style={{
            marginTop: '3rem',
            borderTop: 'solid 1px #000',
            paddingTop: '1rem'
          }}>
            <div className="vd-p-result-desc">
              <strong>Descrição</strong>
              <p style={{
                color: '#3e3e3e !important'
              }}>{formValue.venda?.ven_descricao}</p>
            </div>
            </div>
          )}
      </div>
    );
}
export default Fatura