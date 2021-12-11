import React, { useEffect, useState } from 'react'

import Table from '../../../layout/form/table'

import Form from './artigosForm'

import Api from '../../../../api'

import { Tab } from '../../../layout/form'

import { UseUgest } from '../../context'

export default function Artigo(props) {
  const {
    navigation: { menu, submenu },
  } = UseUgest()

  //const { menu,submenu  } = props

  const [artigo, setArtigo] = useState([])

  const [tabContent, setTabContent] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data = [] } =
        (await Api.get(`/${menu.toLocaleLowerCase()}`)) || {}

      console.log('data', data)

      setArtigo(data)
    })()
  }, [menu])

  useEffect(() => {
    setTabContent([
      {
        name: 'Produto',
        icon: 'fa fa-tag',
        content: (
          <section className="otherForms">
            <Form
              onUpdate={async () => {
                const { data } = await Api.get(`/${menu.toLocaleLowerCase()}`)
                setArtigo(data)
              }}
              route={menu}
            />
          </section>
        ),
      },
      {
        name: 'Serviço',
        icon: 'fa fa-cog',
        content: 'ola',
      },
    ])
  }, [submenu, menu])

  return submenu === 'Novo' ? (
    <div>
      <div className="otherContainer">
        <Tab data={tabContent} />
      </div>{' '}
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
          options={{
            onlyCollumn: [
              'art_designacao',
              'art_estado_id',
              'art_id',
              'art_imagem',
              'art_preco',
              'art_stock_minimo',
              'art_stock_real',
              'art_tipoArtigo_id',
            ],
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
          data={artigo}
        />
      </div>{' '}
    </div>
  )
}
