import React, { useEffect, useState } from 'react'

import { UseUgest } from '../../context'

import Api from '../../../../api'

import Table from '../../../layout/form/table'

/** Views */

import { getFormatedDate, months } from '../../../../util/formatDate'

export default function Endereco() {
  const {
    navigation: { submenu: route },
  } = UseUgest()

  const [verify, setVerify] = useState(false)
  const [data, setData] = useState([])
  const [dataMonth, setDataMonth] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await Api.get(
        `/${route === 'V. Produto' ? 'produstosvenda' : 'venda'}`,
      )

      const data = response?.data?.data || []

      let allData = [[], [], [], [], [], [], [], [], [], [], [], []]

      data?.forEach((item) => {
        const { ven_data_registrar, ven_data_venda } = item
        const month = getFormatedDate(ven_data_registrar).month

        item['ven_data_venda'] = getFormatedDate(ven_data_venda).date

        if (item) {
          allData[month] = [...allData[month], item]
        }
      })

      setData(allData)
    })()
  }, [route])

  function onCardClick(index) {
    setDataMonth(data[index])
    setVerify(true)
  }

  return (
    <div className="otherContainer">
      {route === 'Vendas' && (
        <div className="container-card-months">
          {!verify ? (
            data?.map(
              (value, index) =>
                (value.length && (
                  <div
                    className="card-months"
                    key={index}
                    onClick={() => onCardClick(index)}
                  >
                    <div className="card-first-item">
                      <span>{value.length}</span>
                      <i className="fas fa-newspaper" />
                    </div>
                    <span>{months[index]}</span>
                  </div>
                )) || <></>,
            )
          ) : (
            <div
              className="tbOut"
              style={{
                padding: '2rem',
                width: '100%',
                backgroundColor: 'white',
              }}
            >
              <Table
                options={{
                  onlyCollumn:
                    route !== 'V. Produto'
                      ? [
                          'VEN_ID',
                          'VEN_TOTAL',
                          'VEN_QUANTIDADE',
                          'VEN_TROCO',
                          'VEN_VALOR_PAGO',
                          'VEN_CLIENTE_ID',
                          'VEN_ESTADO',
                          'VEN_DATA_VENDA	',
                        ]
                      : [],
                  sufix: route === 'V. Produto' ? 'prod_' : 'ven_',
                  header: {
                    search: true,
                    buttons: true,
                    modal: {
                      content: 'tes',
                      label: {
                        icon: 'fas fa-edit',
                        title: 'Editar',
                      },
                    },
                  },
                }}
                data={dataMonth}
                back={() => setVerify(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
