import React, { useEffect, useState } from 'react'

import { Input, Select, Button, InputFile } from '../../../layout/form'

import { UseUgest } from '../../context'

import Api from '../../../../api'
import { getArtigo, getState } from '../../../../api/service'

const Form = () => {
  const { action = {}, setAction } = UseUgest()
  const [estado, setEstado] = useState([])
  const [tipoArtigo, setTipoArtigo] = useState()

  const initial = async () => {
    const state = await getState()
    const artigo = await getArtigo()

    setTipoArtigo(artigo)
    setEstado(state)
    setAction({
      toSave: {},
      toEdit: {},
    })
  }

  useEffect(() => {
    initial()
  }, [])

  return (
    <>
      <div className="productContentMain">
        <div>
          <InputFile
            onChange={(e) => {
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  art_imagem: e.target.files[0],
                },
              })
            }}
          />
        </div>
        <div className="formContent">
          <div className="fCr">
            <Input
              icon="fas fa-pen"
              label="Designação"
              type="text"
              placeholder="Nome do artigo"
              onChange={(e) =>
                setAction({
                  ...action,
                  toSave: {
                    ...action.toSave,
                    art_designacao: e?.target?.value,
                  },
                })
              }
            />
            <Input
              icon="fas fa-credit-card"
              label="Preço unitário"
              type="number"
              placeholder="valor"
              onChange={(e) =>
                setAction({
                  ...action,
                  toSave: {
                    ...action.toSave,
                    art_preco: +e?.target?.value,
                  },
                })
              }
            />
            <Select
              label="Estado"
              data={estado}
              onChange={(e) =>
                setAction({
                  ...action,
                  toSave: {
                    ...action.toSave,
                    art_estado_id: e?.target?.value,
                  },
                })
              }
            />
            <Select
              label="Tipo de Artigo"
              data={tipoArtigo}
              onChange={(e) =>
                setAction({
                  ...action,
                  toSave: {
                    ...action.toSave,
                    art_tipoArtigo_id: e?.target?.value,
                  },
                })
              }
            />

            <Input
              icon="fas fa-boxes"
              label="Stock real"
              type="number"
              placeholder="10"
              defaultValue="1"
              onChange={(e) =>
                setAction({
                  ...action,
                  toSave: {
                    ...action.toSave,
                    art_stock_real: +e?.target?.value,
                  },
                })
              }
            />
            <Input
              defaultValue="0"
              title="Stock mínimo deve ser menor que o stock real"
              icon="fas fa-box"
              label="Stock mínimo"
              type="number"
              placeholder="0"
              onChange={(e) =>
                setAction({
                  ...action,
                  toSave: {
                    ...action.toSave,
                    art_stock_minimo: +e?.target?.value,
                  },
                })
              }
            />
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
                if (
                  action.toSave.art_stock_minimo >= action.toSave.art_stock_real
                ) {
                  alert('O stock minimo deve ser menor que so stock real')
                  return
                }

                let data = new FormData()

                Object.keys(action.toSave).forEach((key) => {
                  data.set(key, action.toSave[key])
                  console.log('key =>', action.toSave[key])
                })

                const res = await Api.post(`/artigo`, data)

                if (res.status == 200) {
                  alert('Cadastrado com sucesso!')
                  initial()
                  window.location.href = 'http://localhost:3000/faturar'
                } else {
                  alert('Falha ao cadastra!')
                }
              }}
            >
              Salvar
              <i className="fa fa-save" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form
