import React, { useEffect, useState } from 'react'

import { Tab } from '../../../layout/form'

import { UseUgest } from '../../context'

import Api from '../../../../api'

import Table from '../../../layout/form/table'

/** Views */

import DadosPessoais from './dodospessoais'
import Contacto from './contacto'
import Endreco from './endereco'

export default function Endereco() {
  const {
    navigation: { submenu: route },
    action: { toSave },
  } = UseUgest()

  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data } = await Api.get(`/pessoa`)
      setData(data)
    })()
  }, [])

  return (
    <div className="otherContainer">
      {route === 'Nova' ? (
        <Tab
          data={[
            {
              name: 'Dados pessoais',
              icon: 'fa fa-user',
              content: <DadosPessoais />,
            },
            {
              name: 'Endereço',
              icon: 'fa fa-map-pin',
              content: <Endreco />,
            },
            {
              name: 'Contacto',
              icon: 'fa fa-phone-alt',
              content: <Contacto />,
            },
          ]}
          isStep
          onDone={async () => {
            let dataPessoa = new FormData()
            let dataEndereco = new FormData()
            let dataContato = new FormData()

            Object.keys(toSave?.['dadospessoais'] || {}).map((key) =>
              dataPessoa.set(key, toSave['dadospessoais'][key]),
            )

            const { statusText } = await Api.post(`/pessoa`, dataPessoa)

            if (statusText === 'OK') {
              Object.keys(toSave?.['endereco'] || {}).map((key) =>
                dataEndereco.set(key, toSave['endereco'][key]),
              )

              dataEndereco.append('end_pessoa_id', 1)

              const { statusText: enderecoStatusText } = await Api.post(
                `/endereco`,
                dataEndereco,
              )

              Object.keys(toSave['contacto'] || {}).map((key) =>
                dataContato.set(key, toSave['contacto'][key]),
              )

              dataContato.append('cont_pessoa_id', 1)

              const { statusText: contactoStatusText } = await Api.post(
                `/contacto`,
                dataContato,
              )

              console.log(enderecoStatusText, contactoStatusText)
            }
          }}
        />
      ) : (
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
              onlyCollumn: [],
              header: {
                search: true,
                buttons: true,
                modal: {
                  content: 'tes',
                  label: {
                    icon: 'fas fa-edit',
                    title: 'Editar',
                  },
                },
              },
            }}
            data={data}
          />
        </div>
      )}
    </div>
  )
}
