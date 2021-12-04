import React, { useState, useEffect } from 'react'
import { Input, Select, Button, TextArea } from '../../../../layout/form'
import { UseUgest } from '../../../context'
import { getState } from '../../../../../api/service'
import Api from '../../../../../api'

export default function NovaTaxa() {
  const { action, setAction } = UseUgest()
  const [estado, setEstado] = useState([])

  const initial = async () => {
    setEstado(await getState())

    setAction({
      toSave: {},
      toEdit: {},
    })
  }

  useEffect(() => {
    initial()
  }, [])

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
                value: 'imposto',
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
            console.log('data=> ', action.toSave)
            Api.post(`/taxa`, action.toSave).then((e) => {
              initial()
            })
          }}
        >
          Salvar
          <i className="fa fa-save" />
        </Button>
      </div>
    </div>
  )
}
