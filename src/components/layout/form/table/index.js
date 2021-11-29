import React, { useState, useEffect } from 'react'

import { Convert } from '../../../../util/money'
import { Min } from '../../../../util/condiction'

import { Input } from '../index'
import Modal from '../modal'

export default function Table({
  data = [],
  options = {
    onlyCollumn: [],
    sufix: '',
    header: {
      search: false,
      buttons: false,
      pagination: false,
      modal: {
        label: '',
        content: <div></div>,
      },
    },
  },
  onHover,
  isDoc,
  back,
}) {
  const [dataTable, setDataTable] = useState([])
  const [columns, setColumns] = useState([])
  const [toggle, setToggle] = useState(false)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    Array.isArray(data) &&
      setDataTable(
        data.filter(
          (item) =>
            JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) >
            -1,
        ),
      )
  }, [data, filter])

  useEffect(() => {
    Array.isArray(data) && setDataTable(data)
  }, [data])

  useEffect(() => {
    if (!dataTable.length) return
    setColumns(Object.keys(dataTable[0]))
  }, [dataTable])

  const verifyColumn = (col) =>
    JSON.stringify(options.onlyCollumn)
      .toLocaleLowerCase()
      .indexOf(col.toLocaleLowerCase()) > -1
      ? true
      : false

  const formatValeu = (value, type) => {
    if (type === 'preço')
      return <span className="monay">{Convert(value, 'AOA')}</span>
    if (type === 'quantidade')
      return (
        <span className={'qtd ' + (parseInt(value) <= Min.qtd ? 'isLow' : '')}>
          {parseInt(value) <= Min.qtd && <i className="fa fa-arrow-down" />}
          {value}
        </span>
      )

    return value ? value : '-'
  }

  return (
    <div>
      {!!options?.header?.modal && (
        <div>
          {options.header.modal.content && (
            <Modal onClose={() => setToggle(!toggle)} display={toggle}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    padding: '0 2rem',
                  }}
                >
                  <h2>{options.header.modal.label.title}</h2>
                </div>
                <div>{options.header.modal.content}</div>
              </div>
            </Modal>
          )}
        </div>
      )}
      <div className={`tableConatiner ${!!isDoc ? ' isDoc--table' : ''}`}>
        {options?.header && (
          <div>
            <div className="pSearchIcon">
              {options.header.search && (
                <Input
                  onChange={(e) => setFilter(e.target.value)}
                  icon="fa fa-search"
                  placeholder="Pesquisar"
                />
              )}
            </div>
            <div>
              {options.header.buttons && (
                <div>
                  <button>
                    <i className="fa fa-filter" />
                    filtrar
                  </button>
                  <button>
                    <i className="fa fa-trash" />
                    Eliminar
                  </button>
                  {options.header.modal.label && (
                    <button onClick={() => setToggle(!toggle)}>
                      <i className={options.header.modal.label.icon} />
                      {options.header.modal.label.title}
                    </button>
                  )}
                  {back && (
                    <button onClick={() => back()}>
                      <i className="fa fa-chevron-left" />
                      Voltar
                    </button>
                  )}

                  {/*<button onClick={()=>setToggle(!toggle)}>
                                <i className="fa fa-plus"/>
                                Novo
                            </button>*/}
                </div>
              )}
            </div>
          </div>
        )}
        <table cellSpacing={0}>
          <thead>
            <tr>
              {columns.map((col, index) => {
                if (options.onlyCollumn && options.onlyCollumn.length > 0)
                  return (
                    verifyColumn(col) && (
                      <th key={index}>
                        {col
                          .replace(options?.sufix, '')
                          .replace(/([A-Z]+)/g, ' $1')
                          .replace(/([A-Z][a-z])/g, ' $1')}
                      </th>
                    )
                  )
                else
                  return (
                    <th key={index}>
                      {col
                        .replace(options?.sufix, '')
                        .replace(/([A-Z]+)/g, ' $1')
                        .replace(/([A-Z][a-z])/g, ' $1')}
                    </th>
                  )
              })}
              {!isDoc && <th></th>}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item, index) => (
              <tr key={index} onMouseEnter={() => onHover && onHover(item)}>
                {columns.map((col, index) => {
                  if (options.onlyCollumn && options.onlyCollumn.length > 0)
                    return (
                      verifyColumn(col) && (
                        <td key={index}>{formatValeu(item[col], col)}</td>
                      )
                    )
                  else return <td key={index}>{formatValeu(item[col], col)}</td>
                })}
                {!isDoc && (
                  <td>
                    <button className="tableButton">
                      <i className="fa fa-ellipsis-v" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
