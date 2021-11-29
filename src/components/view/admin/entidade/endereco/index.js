import React, { useState, useEffect } from 'react'

import { Input, Select } from '../../../../layout/form'

import { UseUgest } from '../../../context'


export default function Endereco() {

    const { action,multUso, setAction } = UseUgest()

    const [ estado, setEstado ] = useState([])

    useEffect(() => {
        setEstado(multUso.estado.map(({ est_id, est_designacao })=>{
            return { value: est_id, label: est_designacao }
        }))
    }, [multUso])
    

    return (
        <div>
        <div className="estadoForm">
            <Input 
                            icon="fas fa-map"
                            label="Morada"
                            type="text"
                            placeholder="rua 52, Urbanização nova vida, Luanda"
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        endereco:{
                                            ...action.toSave.endereco,
                                            end_morada: e.target.value
                                        }
                                    }
                                })}
                        />
                        <Input 
                            icon="fas fa-map"
                            label="Localidade"
                            type="text"
                            placeholder=""
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        endereco:{
                                            ...action.toSave.endereco,
                                            end_localidade: e.target.value
                                        }
                                    }
                                })}
                        />
                  
                  <Input 
                            icon="fas fa-flag"
                            label="Código postal"
                            type="number"
                            placeholder=""
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        endereco:{
                                            ...action.toSave.endereco,
                                            end_codigo_postal: e.target.value
                                        }
                                    }
                                })}
                        />
                        <Input 
                            icon="fas fa-flag"
                            label="Latitude"
                            type="number"
                            placeholder=""
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        endereco:{
                                            ...action.toSave.endereco,
                                            end_latitude: e.target.value
                                        }
                                    }
                                })}
                        />
                        <Input 
                            icon="fas fa-flag"
                            label="Longitude"
                            type="number"
                            placeholder=""
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        endereco:{
                                            ...action.toSave.endereco,
                                            end_longitude: e.target.value
                                        }
                                    }
                                })}
                        />
                        <Select
                             onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        endereco:{
                                            ...action.toSave.endereco,
                                            end_estado_id: e.target.value
                                        }
                                    }
                                })}
                            label="Estado"
                            data={estado}
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <label style={{
                                cursor: 'pointer'
                            }} htmlFor="qestionAddress">Este endereço, é o principal ? </label> <input style={{
                                marginLeft: '1rem',
                                marginBottom: '1rem'
                            }} id="qestionAddress" type="checkbox" onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        endereco:{
                                            ...action.toSave.endereco,
                                            end_principal: e.target.checked
                                        }
                                    }
                                })}  />
                        </div>
        </div>
        </div>
    )
}
