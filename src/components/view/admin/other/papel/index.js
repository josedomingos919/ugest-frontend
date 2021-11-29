import React, { useState, useEffect } from 'react'

import { Input, Select } from '../../../../layout/form'

import { UseUgest } from '../../../context'


export default function Papel() {

    const { multUso, action, setAction } = UseUgest()

    const [ estado, setEstado ] = useState([])

    useEffect(() => {

        setEstado(multUso.estado.map(({ est_id, est_designacao })=>{
            return { value: est_id, label: est_designacao }
        }))
    }, [multUso])

    return (
        <div className="estadoForm">
            <Input 
                            icon="fas fa-pen"
                            label="Designação"
                            type="text"
                            placeholder="nome"
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        pap_designacao: e.target.value
                                    }
                                })}
                        />
                        <Select
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        pap_estado_id: e.target.value
                                    }
                                })}
                            label="Estado"
                            data={estado}
                        />
        </div>
    )
}
