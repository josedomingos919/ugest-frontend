import React from 'react'

import Table from '../../../layout/form/table'

import Form from './stockForm'

export default function Stock(props) {

    const { submenu  } = props

    const produtos = [
        {
          nome: 'Marcelo Burlon',
          categoria: 'Roupa',
          subcategoria: 'T-shert',
          'preço': 25306,
          estado: 'activo',
          quantidade: 8,
          foto: 'mrcb.jpg'
        },
        {
          nome: 'Balanciaga',
          categoria: 'Calçados',
          subcategoria: 'Botas',
          'preço': 4505.02,
          estado: 'activo',
          quantidade: 16,
          foto: 'botas.jpg'
        },
        {
          nome: 'SmartWath',
          categoria: 'Eletrônicos',
          subcategoria: 'Relógio',
          'preço': 8500.728,
          estado: 'activo',
          quantidade: 3,
          foto: 'relogio.jpg'
        },
        {
          nome: 'Test',
          categoria: 'Eletrônicos',
          subcategoria: 'Relógio',
          'preço': 70000,
          estado: 'inativo',
          quantidade: 35,
          foto: 'relogio.jpg'
        }
    ]

    return (
                submenu === 'Novo' ? <Form /> : (
                    <div style={{
                        padding: '2rem',
                        width: '100%',
                        backgroundColor: 'white'
                    }}>
                        <Table
            onHover={e=>{}}
        options={{
          onlyCollumn: [
            'nome',
            'categoria',
            'subcategoria',
            'preço',
            'estado',
            'quantidade',
          ],
          header:{
            search: true,
            buttons: true,
            modal:{
                content: <Form /> ,
                label: {
                    icon: "fas fa-edit",
                    title: "Editar"
                }
            }
          }
        }} 
        data={produtos} />
                    </div>
                )
    )
}
