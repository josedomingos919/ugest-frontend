import React, { useEffect, useState } from 'react'

import { Button } from '../../../layout/form'
import Counter from '../../../layout/form/counter'

import { UseUgest } from '../../context'

import { url } from '../../../../api'

function ProductPropForm({ product }) {
  const {
    tip_designacao,
    art_imagem,
    art_designacao: name,
    art_stock_real: stock,
  } = product

  const [qtd, setQtd] = useState(1)
  const [min, setMin] = useState(1)

  useEffect(() => {
    setMin(1)
  }, [setMin])

  const { shopping, setShopping } = UseUgest()

  return (
    <div className="productPropForm">
      <div>
        <img src={url + '/uploads/' + art_imagem} alt="product" />
      </div>
      <div>
        <div>
          <h3>{name}</h3>
          <div>
            <div>
              <strong>Tipo de artigo </strong>
              {tip_designacao}
            </div>
            <div>
              <strong>Quantidade</strong>
              <Counter onChange={(e) => setQtd(e)} min={min} max={stock} />
            </div>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              let artigo = {
                ...shopping.artigo,
              }

              artigo[product.art_id] = {
                quantidade: qtd,
                artigo: product,
              }

              setShopping({
                ...shopping,
                artigo,
              })
            }}
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductPropForm
