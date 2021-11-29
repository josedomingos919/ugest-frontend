/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { UseUgest } from '../../context'

import { Button } from '../../../layout/form'

import { Convert } from '../../../../util/money'
import { URL_IMG } from '../../../../util/globals'
import Api from '../../../../api'

function Shopping() {
  const { shopping, setNavigation, setShopping } = UseUgest()

  const [artigo, setArtigo] = useState([])
  const [total, setTotal] = useState(0)

  const [taxa, setTaxa] = useState({})

  const [prod, setProd] = useState({})

  const calc = () => total + (total * 14) / 100

  useEffect(() => {
    let _total = 0

    artigo.forEach((item) => {
      const {
        quantidade,
        artigo: { art_preco },
      } = item

      _total += quantidade * art_preco
    })

    setTotal(_total)
  }, [artigo])

  useEffect(() => {
    setShopping({
      ...shopping,
      total: calc(),
      totalSemIva: total,
      imp: (total * 14) / 100,
    })

    console.log('my taxa', artigo)
  }, [artigo, total])

  useEffect(() => {
    if (!shopping.artigo) return

    setArtigo(
      Object.keys(shopping.artigo).map((item) => {
        Api.get(`/taxartigo/?art_id=${item}`).then(({ data }) => {
          let tx = { ...taxa }

          tx[item] = data

          if (JSON.stringify(taxa) !== JSON.stringify(tx)) setTaxa({ ...tx })
        })

        return { ...shopping.artigo[item] }
      }),
    )
  }, [taxa])

  useEffect(() => {
    let prod = {}

    let to = 0

    const art_list = shopping?.artigo

    Object.keys(art_list).forEach((key) => {
      const item = art_list[key]

      const pre =
        getPriceCalc(item?.artigo?.art_preco, taxa[key]) * item?.quantidade

      to += pre

      prod[key] = {
        ...item,
        price: getPriceCalc(item?.artigo?.art_preco, taxa[key]),
        total: pre,
      }
    })

    setProd(prod)
    if (shopping?.total !== to)
      setShopping({
        ...shopping,
        total: to,
      })

    console.log('tno to', to)
  }, [shopping])

  function handleDeleteProduct(index) {
    const auxArtigo = [...artigo]

    auxArtigo.splice(index, 1)

    setShopping({ ...shopping, artigo: auxArtigo })
  }

  const getPriceCalc = (price, listTaxa) => {
    let nPrice = price

    listTaxa?.forEach((item) => {
      nPrice += (price * item?.tax_percentagem) / 100
    })

    return nPrice
  }

  const ArtigoCard = ({
    artigo: { art_id, art_designacao, art_imagem, tip_designacao, art_preco },
    quantidade,
    index,
    taxas,
  }) => {
    return (
      <div className="artigoCard">
        <div>
          <div>
            <h3>{art_designacao}</h3>
          </div>
          <div>
            <span>
              <i className="fa fa-edit" />
            </span>
            <span onClick={() => handleDeleteProduct(index)}>
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>
        <div>
          <div>
            <img src={`${URL_IMG}/${art_imagem}`} alt="product" />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>
              <strong>Tipo do Produto </strong>
              {tip_designacao}
            </span>
            <span>
              <strong>Preço unitário </strong>
              {Convert(art_preco, 'AOA')}
            </span>
            <span>
              <strong>Quantidade </strong>
              {quantidade}
            </span>
            {taxas?.length > 0 && <h5>Taxas</h5>}
            {taxas?.map(({ tax_descricao, tax_percentagem }, index) => {
              return (
                <span key={index}>
                  <strong>{tax_descricao} </strong>
                  {tax_percentagem} %
                </span>
              )
            })}
          </div>
        </div>
        <div>
          <strong
            style={{
              marginRight: '1rem',
            }}
          >
            Subtotal{' '}
          </strong>{' '}
          {Convert(getPriceCalc(art_preco, taxas) * quantidade, 'AOA')}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="shoppingConatiner">
        <div>
          <div>
            <h3
              style={{
                fontWeight: 'bold',
                margin: 0,
              }}
            >
              Total{' '}
              <label
                style={{
                  fontWeight: 'normal',
                }}
              >
                {Convert(shopping?.total)}
              </label>
            </h3>
          </div>
          <div>
            <div className="btns-final">
              <Button
                onClick={() => {
                  setShopping({})
                  window.location.href = '/faturar'
                }}
                style={{
                  marginRight: '1rem',
                }}
                className="cancel"
              >
                <i
                  className="fa fa-times"
                  style={{
                    marginRight: '1rem',
                  }}
                />
                Anular venda
              </Button>
              <Link to="/faturar/listadecompras/pagamento">
                <Button
                  onClick={() => {
                    setShopping({
                      ...shopping,
                      artigo: prod,
                    })

                    setNavigation({
                      menu: 'Pagamento',
                      route: 'pagamento',
                    })
                  }}
                >
                  <i
                    className="fa fa-credit-card"
                    style={{
                      marginRight: '1rem',
                    }}
                  />
                  Fazer pagamento
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <h4>Resumo</h4>
              </div>
              <div>
                <div>
                  <span>Total s/ Imposto</span>
                  <span>{Convert(total)} </span>
                </div>
                <div>
                  <span>Desconto</span>
                  <span>0%</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul>
              {artigo.map((item, index) => (
                <li key={`artigo-card-${index}`}>
                  <ArtigoCard
                    {...item}
                    taxas={taxa[item?.artigo?.art_id]}
                    index={index}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shopping
