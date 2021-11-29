import React, { useState, useEffect } from 'react'

import { Input, Select, Button, TextArea } from '../../../../layout/form'

import { UseUgest } from '../../../context'

import Api from '../../../../../api'

export default function NovaTaxa() {
  const { action, multUso, setAction } = UseUgest()

  const [estado, setEstado] = useState([])

  const [papel, setPapel] = useState([])

  useEffect(() => {
    Array.isArray(multUso?.estado) &&
      setEstado(
        multUso.estado.map(({ est_id, est_designacao }) => {
          return { value: est_id, label: est_designacao }
        }),
      )
  }, [multUso])

  useEffect(() => {
    ;(async () => {
      const response = await Api.get(`/papel`)
      const data = response?.data?.data || []

      setPapel(
        data.map(({ pap_id, pap_designacao }) => {
          return { value: pap_id, label: pap_designacao }
        }),
      )
      console.log(papel)
    })()
  }, [papel])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <div className="estadoForm">
          <Select
            onChange={(e) =>
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  tax_tipo: e.target.value,
                },
              })
            }
            label="Tipo"
            data={[
              {
                label: 'Imposto',
                value: 'inposto',
              },
              {
                label: 'Encargo',
                value: 'encargo',
              },
              {
                label: 'Desconto',
                value: 'desconto',
              },
            ]}
          />
          <Input
            icon="fas fa-money"
            label="Preço"
            type="number"
            placeholder="0"
            onChange={(e) =>
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  tax_preco: e.target.value,
                },
              })
            }
          />
          <Input
            icon="fas fa-percent"
            label="Percentagem"
            type="text"
            placeholder="0"
            onChange={(e) =>
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  tax_percentagem: e.target.value,
                },
              })
            }
          />

          <Select
            onChange={(e) =>
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  tax_estado: e.target.value,
                },
              })
            }
            label="Estado"
            data={estado}
          />
          <div />
          <div />
          <TextArea
            label="Descrição"
            onChange={(e) => {
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  tax_descricao: e.target.value,
                },
              })
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <Button
          className="cancel"
          style={{
            marginRight: '1rem',
          }}
        >
          Cancelar
          <i className="fa fa-times" />
        </Button>
        <Button
          onClick={async () => {
            console.log(action.toSave)

            Api.post(`/taxa`, action.toSave).then((e) => {
              console.log(e)

              setAction({
                ...action,
                toSave: {},
              })
            })

            /* if (action.toSave.art_stock_minimo >= action.toSave.art_stock_real) {
                            alert('O stock minimo deve ser menor que so stock real')
                            return
                        }
                        
                        let data = new FormData()

                        
                        Object.keys(action.toSave).map((key) => {
                            data.set(key, action.toSave[key])
                        });
                                        const res = await Api.post( `/artigo`,data);*/
          }}
        >
          Salvar
          <i className="fa fa-save" />
        </Button>
      </div>
    </div>
  )
}
