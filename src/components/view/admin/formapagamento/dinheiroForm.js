import React, { useState, useEffect } from 'react'

import { Input } from '../../../layout/form'

import { UseUgest } from '../../context'

const DinheiroForm = ({ data }) => {
  const { shopping, setShopping } = UseUgest()

  const [valorPago, setValorPago] = useState()
  const [troco, setTroco] = useState()
  const [venda, setVenda] = useState({})

  useEffect(() => {
    data(venda)
  }, [venda, data])

  useEffect(() => {
    setTroco(valorPago - shopping.total)
  }, [valorPago, setTroco, shopping.total])

  useEffect(() => {
    setShopping({
      ...shopping,
      troco,
    })
  }, [troco, setShopping, shopping])

  return (
    <div className="dinheiroContainer">
      <Input
        label="Valor pago"
        icon="fa fa-money-bill"
        type="number"
        onChange={(e) => {
          setValorPago(+e.target.value)
        }}
        placeholder={shopping.total}
        onBlur={() =>
          setVenda({
            ...venda,
            ven_valor_pago: valorPago,
            ven_troco: troco,
          })
        }
      />
      <Input
        label="Troco"
        icon="fa fa-hand-holding-usd"
        type="number"
        value={valorPago >= shopping?.total ? troco : 0}
        placeholder="0.00"
        readOnly
      />
    </div>
  )
}
export default DinheiroForm
