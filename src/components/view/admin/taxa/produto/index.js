import React, { useState, useEffect } from 'react'

import { Input, Select, Button } from '../../../../layout/form'

import { UseUgest } from '../../../context'

import Api from '../../../../../api'
import { getState } from '../../../../../api/service'

export default function NovaTaxa() {
  const { action, setAction } = UseUgest()

  const [estado, setEstado] = useState([])

  const [taxa, setTaxa] = useState([])

  const [artigoId, setArtigoId] = useState()

  const [artigo, setArtigo] = useState()

  const initial = async () => {
    setEstado(await getState())
  }

  useEffect(() => {
    initial()
  }, [])

  useEffect(() => {
    Api.get(`/taxa`).then((e) => {
      const data = e?.data?.data || []

      setTaxa(
        data?.map(({ tax_id, tax_descricao }) => {
          return { label: tax_descricao, value: tax_id }
        }),
      )
    })
  }, [])

  useEffect(() => {
    if (artigoId > 0)
      Api.get(`/artigo/${artigoId}`).then((e) => {
        const data = e?.data?.data || []

        setArtigo(data[0])
      })
  }, [artigoId])

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
          <Input
            icon="fas fa-box"
            label="Artigo"
            type="number"
            placeholder="Código do artigo"
            onChange={(e) => {
              setArtigoId(e.target.value)
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  trt_art_id: e.target.value,
                },
              })
            }}
          />
          <Input
            icon="fas fa-pen"
            label="Designação"
            type="text"
            placeholder="nome do artigo"
            value={artigo?.art_designacao}
            readOnly
          />
          <Input
            icon="fas fa-boxes"
            label="Tipo de artigo"
            type="text"
            placeholder="tipo"
            value={artigo?.tip_designacao}
            readOnly
          />
          <Select
            onChange={(e) =>
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  trt_taxa_id: e.target.value,
                },
              })
            }
            label="Tipo de taxa"
            data={taxa}
          />

          <Select
            onChange={(e) =>
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  trt_estado: e.target.value,
                },
              })
            }
            label="Estado"
            data={estado}
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

            Api.post(`/taxartigo`, action.toSave).then((e) => {
              console.log(e)
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
