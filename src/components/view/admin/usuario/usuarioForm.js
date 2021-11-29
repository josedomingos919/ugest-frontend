import React, { useEffect, useState } from 'react'

import { Input, Select, Button } from '../../../layout/form'

import { UseUgest } from '../../context'

import Api from '../../../../api'

const UsuarioForm = (props) => {
  const { setLoader, setAction, multUso, action } = UseUgest()
  const [estado, setEstado] = useState([])
  const [nivelAcesso, setNivelAcesso] = useState()

  const [user, setUser] = useState()

  useEffect(() => {
    Array.isArray(multUso?.estado) &&
      setEstado(
        multUso.estado.map(({ est_id, est_designacao }) => {
          return { value: est_id, label: est_designacao }
        }),
      )
  }, [multUso])

  useEffect(() => {
    ;(async () => {
      const response = await Api.get(`/nivelacesso`)
      const data = response?.data?.data || []

      setNivelAcesso(
        data.map(({ niv_id, niv_designacao }) => {
          return { value: niv_id, label: niv_designacao }
        }),
      )
    })()
  }, [])

  async function searchBI(bi) {
    setLoader({
      state: true,
      label: null,
    })

    const response = await Api.get(`/pessoa/bi/${bi}`)
    const data = response?.data?.data || []

    let obj = data[0]

    console.log(obj)

    if (!!obj) setUser(obj)

    setLoader({
      state: false,
      label: null,
    })
  }

  return (
    <div className="formContent">
      <div className="fCr">
        <Input
          icon="fas fa-user"
          label="NIF/BI"
          type="text"
          placeholder="nif do proprietário"
          //onChange={e => props.getBI(e.target.value)}
          onBlur={(e) => searchBI(e.target.value)}
        />

        <Input
          icon="fas fa-user-check"
          label="Proprietário"
          type="text"
          readOnly
          placeholder="nome completo"
          defaultValue={user?.pes_nome}
        />

        <Input
          icon="fas fa-pen"
          label="Nome"
          type="text"
          placeholder="nome.usuario"
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                usu_username: e.target.value,
              },
            })
          }
        />
        <Select
          label="Nível de acesso"
          data={nivelAcesso}
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                usu_nivelAcesso_id: e.target.value,
              },
            })
          }
        />

        <Input
          icon="fas fa-lock"
          label="Palavra passe"
          type="password"
          onChange={(e) =>
            setAction({
              ...action,
              toSave: {
                ...action.toSave,
                usu_password: e.target.value,
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
                usu_estado_id: e.target.value,
              },
            })
          }
        />
      </div>
      <div>
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
            const res = await Api.post(`/usuario`, {
              ...action.toSave,
              usu_pessoa_id: user?.pes_id,
            })
            console.log('result=>', res)

            props.onUpdate()
          }}
        >
          Salvar
          <i className="fa fa-save" />
        </Button>
      </div>
    </div>
  )
}

export default UsuarioForm
