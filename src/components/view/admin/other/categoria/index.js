import React, { useState, useEffect } from 'react'

import { Input, Select } from '../../../../layout/form'

import { UseUgest } from '../../../context'

import Api from '../../../../../api'

export default function Categoria() {
  const { multUso, action, setAction } = UseUgest()

  const [estado, setEstado] = useState([])

  const [subCategoria, setSubCategoria] = useState([])

  useEffect(() => {
    Array.isArray(multUso?.estado) &&
      setEstado(
        multUso?.estado?.map(({ est_id, est_designacao }) => {
          return { value: est_id, label: est_designacao }
        }),
      )
  }, [multUso])

  useEffect(() => {
    ;(async () => {
      const response = await Api.get(`/subcategoria`)
      const data = response?.data?.data || []

      setSubCategoria(
        data.map(({ scat_id, scat_designacao }) => {
          return { value: scat_id, label: scat_designacao }
        }),
      )
    })()
  }, [])

  return (
    <div className="estadoForm">
      <Input
        icon="fas fa-pen"
        label="Designação"
        type="text"
        placeholder="nome"
        onChange={(e) =>
          setAction({
            ...action,
            toSave: {
              ...action.toSave,
              catg_designacao: e.target.value,
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
              catg_subcategoria_id: e.target.value,
            },
          })
        }
        label="Subcategoria"
        data={subCategoria}
      />
      <Select
        onChange={(e) =>
          setAction({
            ...action,
            toSave: {
              ...action.toSave,
              catg_estado_id: e.target.value,
            },
          })
        }
        label="Estado"
        data={estado}
      />
    </div>
  )
}
