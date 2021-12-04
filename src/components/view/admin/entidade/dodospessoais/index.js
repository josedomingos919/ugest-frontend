import React, { useState, useEffect } from 'react'

import { UseUgest } from '../../../context'
import { Input, Select } from '../../../../layout/form'
import { getPapel, getState } from '../../../../../api/service'

export default function DadosPessoais() {
  const { action, setAction } = UseUgest()
  const [estado, setEstado] = useState([])
  const [papel, setPapel] = useState([])

  const initial = async () => {
    setEstado(await getState())
    setPapel(await getPapel())
  }

  useEffect(() => {
    initial()
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
