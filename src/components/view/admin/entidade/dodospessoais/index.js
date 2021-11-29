import React, { useState, useEffect } from 'react'

import { Input, Select } from '../../../../layout/form'

import { UseUgest } from '../../../context'

import Api from '../../../../../api'

export default function DadosPessoais() {
  const { action, multUso, setAction } = UseUgest()

  const [estado, setEstado] = useState([])

  const [papel, setPapel] = useState([])

  useEffect(() => {
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
    })()
  }, [])

  return (
    <div>
      <div className="estadoForm">
        <Input
          icon="fas fa-user-check"
          label="NIF/BI"
          type="text"
          placeholder="006584515LA564"
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                dadospessoais: {
                  ...action.toSave.dadospessoais,
                  pes_nif: e.target.value,
                },
              },
            })
          }
        />
        <Input
          icon="fas fa-pen"
          label="Nome"
          type="text"
          placeholder="nome completo"
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                dadospessoais: {
                  ...action.toSave.dadospessoais,
                  pes_nome: e.target.value,
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
                dadospessoais: {
                  ...action.toSave.dadospessoais,
                  pes_genero: e.target.value,
                },
              },
            })
          }
          label="Genero"
          data={[
            {
              label: 'Masculino',
              value: 'masculino',
            },
            {
              label: 'Feminino',
              value: 'feminino',
            },
          ]}
        />
        <Select
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                dadospessoais: {
                  ...action.toSave.dadospessoais,
                  pes_estado_civil: e.target.value,
                },
              },
            })
          }
          label="Estado civil"
          data={[
            {
              label: 'Casado/a',
              value: 'casado/a',
            },
            {
              label: 'Solteiro/a',
              value: 'solteiro/a',
            },
            {
              label: 'Viúvo/a',
              value: 'viuvo/a',
            },
          ]}
        />
        <Input
          icon="fa fa-birthday-cake"
          label="Data de nascimento"
          type="date"
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                dadospessoais: {
                  ...action.toSave.dadospessoais,
                  pes_data_nascimento: e.target.value,
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
                dadospessoais: {
                  ...action.toSave.dadospessoais,
                  pap_id: e.target.value,
                },
              },
            })
          }
          label="Papel"
          data={papel}
        />
        <Select
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                dadospessoais: {
                  ...action.toSave.dadospessoais,
                  pap_estado_id: e.target.value,
                },
              },
            })
          }
          label="Estado do papel"
          data={estado}
        />
        <Select
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                dadospessoais: {
                  ...action.toSave.dadospessoais,
                  pes_estado_id: e.target.value,
                },
              },
            })
          }
          label="Estado"
          data={estado}
        />
      </div>
    </div>
  )
}
