import React from 'react';

import { Button } from '..';

import { Convert } from '../../../../util/money';

import { URL_IMG } from '../../../../util/globals';

function Card({
  onClick,
  art_preco,
  art_designacao: nome,
  art_stock_real: stock,
  art_imagem,
  tip_designacao,
}) {
  return (
    <div className="productCard">
      <div>
        <div>
          <img src={`${URL_IMG}/${art_imagem}`} alt="produto" />
        </div>
        <div>
          <h3>{nome}</h3>
        </div>
      </div>
      <div>
        <div>
          <span>
            <strong>Tipo do Produto </strong>
            {tip_designacao}
          </span>
          <span>
            <strong>Preço unitário </strong>
            {Convert(art_preco, 'AOA')}
          </span>
          <span>
            <strong>Stock </strong>
            {stock}
          </span>
        </div>
        <div>
          <Button
            onClick={onClick}
            style={{
              width: '100%',
            }}
          >
            <i className="fa fa-shopping-cart" /> Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
