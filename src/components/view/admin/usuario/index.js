import React, { useEffect, useState } from 'react'

import Table from '../../../layout/form/table'

import Form from './usuarioForm'

import Api from '../../../../api'

import { UseUgest } from '../../context'

export default function Usuario(props) {
  const {
    navigation: { menu, submenu, route },
  } = UseUgest()

  const [usuario, setUsuario] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data } = await Api.get(`/usuario`)
      setUsuario(data)
    })()
  }, [])

  return route !== 'permicoesniveltables' ? (
    submenu === 'Novo' ? (
      <div>
        <Form
          {...props}
          onUpdate={async () => {
            const res = await Api.get(`/usuario`)
            setUsuario(res.data)
          }}
          route={menu}
        />{' '}
      </div>
    ) : (
      <div>
        <div
          className="tbOut"
          style={{
            padding: '2rem',
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <Table
            onHover={(e) => {}}
            options={{
              onlyCollumn: [],
              header: {
                search: true,
                buttons: true,
                modal: {
                  content: <Form />,
                  label: {
                    icon: 'fas fa-edit',
                    title: 'Editar',
                  },
                },
              },
            }}
            data={usuario}
          />
        </div>
      </div>
    )
  ) : null
}
