import React, { useState, useEffect } from 'react'
import { getState } from '../../../../../api/service'
import { Input, Select } from '../../../../layout/form'
import { UseUgest } from '../../../context'

export default function Endereco() {
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
    <div>
      <div className="estadoForm">
        <Input
          icon="fas fa-map"
          label="Morada"
          type="text"
          placeholder="rua 52, Urbanização nova vida, Luanda"
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                endereco: {
                  ...action.toSave.endereco,
                  end_morada: e.target.value,
                },
              },
            })
          }
        />
        <Input
          icon="fas fa-map"
          label="Localidade"
          type="text"
          placeholder=""
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                endereco: {
                  ...action.toSave.endereco,
                  end_localidade: e.target.value,
                },
              },
            })
          }
        />

        <Input
          icon="fas fa-flag"
          label="Código postal"
          type="number"
          placeholder=""
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                endereco: {
                  ...action.toSave.endereco,
                  end_codigo_postal: e.target.value,
                },
              },
            })
          }
        />
        <Input
          icon="fas fa-flag"
          label="Latitude"
          type="number"
          placeholder=""
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                endereco: {
                  ...action.toSave.endereco,
                  end_latitude: e.target.value,
                },
              },
            })
          }
        />
        <Input
          icon="fas fa-flag"
          label="Longitude"
          type="number"
          placeholder=""
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                endereco: {
                  ...action.toSave.endereco,
                  end_longitude: e.target.value,
                },
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
                endereco: {
                  ...action.toSave.endereco,
                  end_estado_id: e.target.value,
                },
              },
            })
          }
          label="Estado"
          data={estado}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <label
            style={{
              cursor: 'pointer',
            }}
            htmlFor="qestionAddress"
          >
            Este endereço, é o principal ?{' '}
          </label>{' '}
          <input
            style={{
              marginLeft: '1rem',
              marginBottom: '1rem',
            }}
            id="qestionAddress"
            type="checkbox"
            onChange={(e) =>
              setAction({
                ...action,
                toSave: {
                  ...action.toSave,
                  endereco: {
                    ...action.toSave.endereco,
                    end_principal: e.target.checked,
                  },
                },
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
