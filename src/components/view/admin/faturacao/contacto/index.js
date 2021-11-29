import React, { useState, useEffect } from 'react'

import { Input, Select } from '../../../../layout/form'

import { UseUgest } from '../../../context'


export default function Contacto() {

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
                            icon="fas fa-envolop"
                            label="Email"
                            type="text"
                            placeholder="exemplo@email.com"
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        contacto:{
                                            ...action.toSave.contacto,
                                            cont_email: e.target.value
                                        }
                                    }
                                })}
                        />
                        <Input 
                            icon="fas fa-fax"
                            label="Fax"
                            type="text"
                            placeholder="- - -"
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        contacto:{
                                            ...action.toSave.contacto,
                                            cont_fax: e.target.value
                                        }
                                    }
                                })}
                        />
                        <Input 
                            icon="fas fa-phone-alt"
                            label="Telefone"
                            type="text"
                            placeholder="+244 --- --- ---"
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        contacto:{
                                            ...action.toSave.contacto,
                                            cont_telefone: e.target.value
                                        }
                                    }
                                })}
                        />
            
            <Input 
                            icon="fas fa-phone-alt"
                            label="Telemovel"
                            type="text"
                            placeholder="+244 --- --- ---"
                            onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        contacto:{
                                            ...action.toSave.contacto,
                                            cont_telemovel: e.target.value
                                        }
                                    }
                                })}
                        />     
                        <Select
                             onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        contacto:{
                                            ...action.toSave.contacto,
                                            cont_estado_id: e.target.value
                                        }
                                    }
                                })}
                            label="Estado"
                            data={estado}
                        />
                        <div></div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <label style={{
                                cursor: 'pointer'
                            }} htmlFor="qestionAddress">Este contacto, é o principal ? </label> <input style={{
                                marginLeft: '1rem',
                                marginBottom: '1rem'
                            }} id="qestionAddress" type="checkbox"  onChange={e=>setAction({
                                    ...action,
                                    toSave: {
                                        ...action.toSave,
                                        contacto:{
                                            ...action.toSave.contacto,
                                            cont_principal: e.target.checked
                                        }
                                    }
                                })}  />
                        </div>
        </div>
        </div>
    )
}
