import React from 'react'

import { Input } from '../../../../layout/form'

import { UseUgest } from '../../../context'

export default function Estado() {
  const { action, setAction } = UseUgest()

  return (
    <div className="estadoForm">
      <Input
        onChange={(e) =>
          setAction({
            ...action,
            toSave: {
              est_designacao: e.target.value,
            },
          })
        }
        icon="fas fa-pen"
        label="Designação"
        type="text"
        placeholder="activo"
      />
    </div>
  )
}
