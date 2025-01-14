import React, { useEffect, useState } from 'react'

import { Tab, Button } from '../../../../layout/form'
import Table from '../../../../layout/form/table'

import { UseUgest } from '../../../context'

/** Api */

import Api from '../../../../../api'

export default function Other(props) {
  const {
    navigation: { submenu, route },
    action,
    setLoader,
  } = UseUgest()

  const [tabContent, setTabContent] = useState([])

  const [otherData, setOtherData] = useState()

  const [res, setRes] = useState()

  useEffect(() => {
    ;(async () => {
      const { data } = await Api.get(`/${route.toLocaleLowerCase()}`)
      setOtherData(data)
    })()
  }, [res, route])

  useEffect(() => {
    if (!otherData)
      setLoader({
        state: true,
        label: null,
      })

    if (otherData)
      setLoader({
        state: false,
        label: null,
      })
  }, [otherData, setLoader])

  useEffect(() => {
    setTabContent([
      {
        name: 'Formulário',
        icon: 'fa fa-plus',
        content: (
          <section className="otherForms">
            <div>permissões</div>
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
                  let data = new FormData()

                  Object.keys(action.toSave).forEach((key) => {
                    data.set(key, action.toSave[key])
                    console.log(key, action.toSave[key])
                  })

                  const res = await Api.post(
                    `/${route.toLocaleLowerCase()}`,
                    data,
                  )

                  setRes(res)

                  console.log('res=>', data)
                }}
              >
                Salvar
                <i className="fa fa-save" />
              </Button>
            </div>
          </section>
        ),
      },
      {
        name: 'Tabela',
        icon: 'fa fa-calendar',
        content: (
          <Table
            options={{
              onlyCollumn: [],
              header: {
                search: true,
                buttons: true,
                modal: {
                  content: (
                    <div className="formContent">
                      <div className="fCr">form</div>
                    </div>
                  ),
                  label: {
                    icon: 'fas fa-edit',
                    title: 'Editar',
                  },
                },
              },
            }}
            data={otherData}
          />
        ),
      },
    ])
  }, [otherData, submenu, props, route, action.toSave])

  return (
    <div className="otherContainer">
      <Tab data={tabContent} />
    </div>
  )
}
