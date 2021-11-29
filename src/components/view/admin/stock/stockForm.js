import React from 'react'

import { Input, Select, Button } from '../../../layout/form'

const StockForm = () =>{
    return(
        <div className="formContent">
        <div className="fCr">
<Input 
                icon="fas fa-pen"
                label="Designação"
                type="text"
                placeholder="Nome do artigo"
            />
<Select
                label="Estado"
                data={[
                    {
                        label: 'Activo',
                        value: 'abc'
                    },
                    {
                        label: 'Inactivo',
                        value: 'abc'
                    }
                ]}
            />
<Select
                label="Tipo de Artigo"
                data={[
                    {
                        label: 'Activo',
                        value: 'abc'
                    },
                    {
                        label: 'Inactivo',
                        value: 'abc'
                    }
                ]}
            />

<Input 
                icon="fas fa-box"
                label="Stock mínimo"
                type="number"
                placeholder="0"
            />
             <Input 
                icon="fas fa-boxes"
                label="Stock máximo"
                type="number"
                placeholder="10"
            />
</div>
<div>
<Button className="cancel" style={{
                  marginRight: '1rem',
                }}>
                Cancelar
                <i className="fa fa-times"/>
              </Button>
              <Button>
                Salvar
                <i className="fa fa-save"/>
              </Button>
</div>
    </div>
    )
}

export default StockForm