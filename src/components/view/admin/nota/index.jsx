import React, { useState, useEffect } from 'react'
import Report from '../../../layout/report'

import { Input, Button } from '../../../layout/form'
import { UseUgest } from '../../context'
import Api from '../../../../api'
import Fatura from '../formapagamento/fataura'
import { Convert } from '../../../../util/money'

function Nota() {
  const { setLoader } = UseUgest()

  const [faturaInfo, setFaturaInfo] = useState()
  const [codeFatura, setCodeFatura] = useState()
  const [artigo_, setArtigo] = useState()

  const [data, setData] = useState([])

  useEffect(() => {
    let artigo = {}
    let artigoTable = []

    faturaInfo?.artigos?.forEach((item) => {
      artigoTable.push({
        Artigo: item?.art_id,
        Denominação: item?.art_designacao,
        'Qtd.:': item?.prod_quantidade + ' UN',
        'Preço unitário': Convert(item?.prod_preco, 'AOA'),
        'Valor Total s/ Imposto': Convert(item?.prod_total, 'AOA'),
      })

      artigo[item?.art_id] = {
        quantidade: item?.prod_quantidade,
        price: item?.prod_preco,
        total: item?.prod_total,
        artigo: {
          art_id: item?.art_id,
          art_designacao: item?.art_designacao,
          art_estado_id: item?.art_estado_id,
          art_tipoArtigo_id: item?.art_tipoArtigo_id,
          art_stock_minimo: item?.art_stock_minimo,
          art_stock_real: item?.art_stock_real,
          art_imagem: item?.art_imagem,
          art_preco: item?.art_preco,
        },
      }
    })

    setArtigo(artigo)
    setData(artigoTable)
  }, [faturaInfo])

  return (
    <div className="notaContainer">
      <div>
        <span
          style={{
            with: '45rem !important',
            marginRight: '1rem !important',
          }}
        >
          <Input
            onChange={(e) => {
              setCodeFatura(e.target?.value)
              setData(undefined)
            }}
            placeholder="Código da fatura ex: 002021FAT"
            icon="fas fa-barcode"
          />
        </span>
        <span
          style={{
            marginLeft: '1rem',
          }}
        >
          <Button
            onClick={() => {
              setLoader({
                state: true,
              })
              Api.get(`/fatura/${codeFatura}`)
                .then(({ data }) => {
                  setFaturaInfo(data)

                  //console.log('fatura=>',data)
                })
                .catch((error) => {
                  console.log('error', error)
                })
                .finally((res) => {
                  setLoader({
                    state: false,
                  })
                })
            }}
          >
            Pesquisar
          </Button>
        </span>
      </div>
      <div>
        <Report
          children={
            data &&
            codeFatura &&
            codeFatura !== '' && (
              <Fatura
                formValue={{
                  pessoa: {
                    pes_estado_id: faturaInfo?.venda?.pes_id,
                    pes_nome: faturaInfo?.venda?.pes_nome,
                    pes_nif: faturaInfo?.venda?.pes_nif,
                  },
                  venda: {
                    ven_valor_pago: faturaInfo?.venda?.ven_valor_pago,
                    ven_troco: faturaInfo?.venda?.ven_troco,
                    ven_cliente_id: faturaInfo?.venda?.ven_cliente_id,
                    ven_estado: faturaInfo?.venda?.ven_estado,
                    ven_descricao: faturaInfo?.venda?.ven_descricao,
                  },
                }}
                artigo={data}
                shopping={{
                  imp: 0, //faltando
                  totalSemIva: 0, //faltando
                  total: faturaInfo?.venda?.ven_total,
                  troco: faturaInfo?.venda?.ven_troco,
                }}
                venda_id={faturaInfo?.fatura}
              />
            )
          }
        />
        )
      </div>
    </div>
  )
}

export default Nota
