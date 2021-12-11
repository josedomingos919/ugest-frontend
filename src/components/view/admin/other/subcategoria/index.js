import React, { useState, useEffect } from 'react'
import { getState } from '../../../../../api/service'
import { Input, Select } from '../../../../layout/form'
import { UseUgest } from '../../../context'

export default function Subcategoria() {
  const { action, setAction } = UseUgest()

  const [estado, setEstado] = useState([])

  const initial = async () => {
    setEstado(await getState())
  }

  useEffect(() => {
    initial()
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
              scat_designacao: e.target.value,
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
              scat_estado_id: e.target.value,
            },
          })
        }
        label="Estado"
        data={estado}
      />
    </div>
  )
}
