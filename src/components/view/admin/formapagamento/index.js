import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Convert } from '../../../../util/money'

import { Tab, Input, Select, Button, TextArea } from '../../../layout/form'

import { UseUgest } from '../../context'

import Dinheiro from './dinheiroForm'

import Api from '../../../../api'

import Loader from '../../../layout/loader'
import Fatura from './fataura'

function Formapagamento() {
  const {
    multUso,
    shopping,
    setShopping,
    setPrint,
    setLoader,
    setNavigation,
  } = UseUgest()

  const [storeType, setStoreType] = useState(0)

  const [estado, setEstado] = useState([])
  const [nif, setNif] = useState('')
  const [name, setName] = useState('')
  const [descricao, setDescricao] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [searching, setSearching] = useState(false)

  const [formValue, setFormValue] = useState({
    pessoa: { pes_estado_id: 1 },
    venda: {},
  })

  async function handleVenda() {
    setLoader({
      state: true,
      label: 'Fazendo a venda...',
    })

    setSearching(true)

    let qtd = 0

    let art = shopping?.artigo

    Object.keys(art).forEach((key) => {
      qtd += art[key]?.quantidade
    })

    let dtSeend = {
      ...formValue.venda,
      ven_total: shopping?.total,
      ven_quantidade: qtd,
    }

    try {
      if (storeType === 1) {
        const { data } = await Api.post('/venda', dtSeend)

        if (data.result) {
          //adicionar o id da venada na fatura assim com o BI do cliente

          Object.keys(art).forEach((key) => {
            Api.post('/produstosvenda', {
              prod_venda_id: data?.result?.ven_id, // falta colocar o id da venda
              prod_art_id: art[key]?.artigo?.art_id,
              prod_quantidade: art[key]?.quantidade,
              prod_total: art[key]?.total, //'total com iva'
              prod_preco: art[key]?.price, //'preco com iva'
            })
              .then((response) => {
                //fazer um update na tabela de artigo reduzindo o stock real
                console.log('carrinho add', response)

                if (response?.data) {
                  const oldArt = art[key]?.artigo

                  Api.put(`/artigo/${oldArt?.art_id}`, {
                    ...oldArt,
                    art_stock_real:
                      oldArt?.art_stock_real - art[key]?.quantidade,
                  }).then((res) => {
                    console.log('venda realizada com sucesso', res)
                    setPrint(
                      <Fatura
                        shopping={shopping}
                        artigo={artigo}
                        formValue={formValue}
                        venda_id={`FAT${
                          data?.result?.ven_id
                        }${new Date().getFullYear()}`}
                      />,
                    )
                  })
                }
              })
              .finally(() => {
                setLoader({
                  state: false,
                })
              })
          })
        }

        if (data) {
          setSearching(false)
        }

        return
      }

      const res = await Api.post('/pessoa', formValue.pessoa)

      if (res?.data) {
        const pessoa = await Api.get(`/pessoa/bi/${nif}`)

        if (pessoa?.data?.length) {
          const { pes_id } = pessoa.data[0]
          const newVenda = { ...formValue.venda, ven_cliente_id: pes_id }

          const res = await Api.post('/venda', newVenda)

          if (res?.data) {
            setSearching(false)
          }

          return
        }
      }

      //alert('Erro ao guardar o cliente!');
    } catch (e) {
      console.log('Erro inesperado', formValue)
      //alert('Erro ao guardar a venda!');
    }
  }

  async function searchBI(bi) {
    setSearching(true)

    const pessoa = await Api.get(`/pessoa/bi/${bi}`)

    if (pessoa?.data?.length) {
      const { pes_id, pes_nome, pes_nif } = pessoa.data[0]

      setStoreType(1)
      setName(pes_nome)
      setDisabled(true)
      setSearching(false)

      setFormValue({
        ...formValue,
        pessoa: { ...formValue.pessoa, pes_nome, pes_nif },
        venda: { ...formValue.venda, ven_cliente_id: pes_id },
      })

      return
    }

    const newPessoa = { ...formValue.pessoa }
    const newVenda = { ...formValue.venda }

    delete newVenda['ven_cliente_id']
    delete newPessoa['pes_nome']

    setFormValue({
      ...formValue,
      pessoa: newPessoa,
      venda: newVenda,
    })

    setName('')
    setSearching(false)
    setDisabled(false)
    setStoreType(1)
  }

  useEffect(() => {
    setEstado(
      multUso?.estado?.map(({ est_id, est_designacao }) => {
        return { value: est_id, label: est_designacao }
      }),
    )
  }, [multUso])

  const [artigo, setArtigo] = useState([])

  useEffect(() => {
    if (!shopping.artigo) return

    setArtigo(
      Object.keys(shopping.artigo).map((item) => {
        const { art_id, art_designacao, art_preco } = shopping.artigo[
          item
        ].artigo

        return {
          Artigo: art_id,
          Denominação: art_designacao,
          'Qtd.': shopping.artigo[item].quantidade + ' UN',
          'Preço unitário': Convert(art_preco),
          'Valor Total s/ Imposto': Convert(
            shopping.artigo[item].quantidade * art_preco,
          ),
        }
      }),
    )
  }, [shopping])

  useEffect(() => {
    setEstado(
      multUso?.estado?.map(({ est_id, est_designacao }) => {
        return { value: est_id, label: est_designacao }
      }),
    )
  }, [multUso])

  return (
    <>
      <Loader state={searching} label="Pesquisando Nif" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tab
          data={[
            {
              content: (
                <Dinheiro
                  data={(e) =>
                    setFormValue({
                      ...formValue,
                      venda: { ...formValue.venda, ...e },
                    })
                  }
                />
              ),
              name: 'Dinheiro',
              icon: 'fa fa-coins',
            },
            {
              content: 'In dev',
              name: 'Multicaixa',
              icon: 'fa fa-credit-card',
            },
          ]}
        />
        <div className="vd-form-dif">
          <div>
            <h4>Informações adicionais</h4>
          </div>
          <div>
            <div>
              <div>
                <Input
                  label="NIF/BI"
                  icon="fa fa-user"
                  type="text"
                  placeholder="cliente"
                  value={nif}
                  onChange={(e) => {
                    setNif(e.target.value)
                  }}
                  onBlur={() => {
                    setFormValue({
                      ...formValue,
                      pessoa: { ...formValue.pessoa, pes_nif: nif },
                    })

                    searchBI(nif)
                  }}
                />
                <Input
                  label="Nome completo"
                  icon="fa fa-pen"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  onBlur={() =>
                    setFormValue({
                      ...formValue,
                      pessoa: { ...formValue.pessoa, pes_nome: name },
                    })
                  }
                  disabled={disabled}
                />
                <Select
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      venda: { ...formValue.venda, ven_estado: e.target.value },
                    })
                  }}
                  label="Estado"
                  data={estado}
                />
              </div>
              <div>
                <TextArea
                  label="Descrição"
                  value={descricao}
                  onChange={(e) => {
                    setDescricao(e.target.value)
                  }}
                  onBlur={() =>
                    setFormValue({
                      ...formValue,
                      venda: { ...formValue.venda, ven_descricao: descricao },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '2rem',
            minHeight: '80px',
          }}
        >
          <span>
            <Button
              onClick={() => {
                setShopping({})
                window.location.href = '/faturar'
              }}
              className="cancel"
            >
              <i
                className="fa fa-times"
                style={{
                  marginRight: '.5rem',
                }}
              />
              Cancelar
            </Button>
          </span>
          <Link
            style={{
              display: 'flex',
            }}
            to="/arquivo"
          >
            <span
              style={{
                marginLeft: '1rem',
              }}
            >
              <Button
                onClick={() => {
                  setNavigation({
                    menu: 'Arquivo',
                    route: null,
                  })

                  handleVenda()
                }}
              >
                <i
                  style={{
                    marginRight: '.5rem',
                  }}
                  className="fa fa-save"
                />
                vender
              </Button>
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default memo(Formapagamento)
