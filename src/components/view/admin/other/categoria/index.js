import React, { useState, useEffect } from 'react'

import { Input, Select } from '../../../../layout/form'

import { UseUgest } from '../../../context'

import Api from '../../../../../api'
import { getState } from '../../../../../api/service'

export default function Categoria() {
  const { action, setAction } = UseUgest()
  const [estado, setEstado] = useState([])
  const [subCategoria, setSubCategoria] = useState([])

  const initial = async () => {
    setEstado(await getState())
  }

  useEffect(() => {
    initial()
  }, [])

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
