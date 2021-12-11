import React, { createContext, useContext, useState } from 'react'

import Faturar from '../admin/faturar'
import Painel from '../admin/painel'
import Other from '../admin/other'
import Artigo from '../admin/artigo'
import Stock from '../admin/stock'
import Entidade from '../admin/entidade'
import Faturacao from '../admin/faturacao'
import Taxa from '../admin/taxa'
import Usuario from '../admin/usuario'
import Permissoes from '../admin/usuario/permissoes'
import Report from '../../layout/report'

import Nota from '../../view/admin/nota'

import Shopping from '../admin/shopping'

import Formapagamento from '../admin/formapagamento'
import { useEffect } from 'react/cjs/react.development'
import { getUserSession, logOut } from '../../../api/service'
import { isEmpty } from '../../../util/functions'

const UgestContext = createContext()

export const UgestProvider = ({ children }) => {
  const [userData, setUserData] = useState({})
  const [navigation, setNavigation] = useState({})
  const [preference, setPreference] = useState({
    ...(JSON.parse(localStorage.getItem('UserPreference')) || { mode: true }),
  })
  const [action, setAction] = useState({
    toSave: {},
    toEdit: {},
  })
  const [shopping, setShopping] = useState({
    total: 0,
    troco: 0,
    artigo: {},
  })
  const [loader, setLoader] = useState({
    state: false,
    label: null,
  })

  const [print, setPrint] = useState()

  const [multUso, setMulUso] = useState([])

  const [menu, setMenu] = useState([
    {
      name: 'Faturar',
      route: 'faturar',
      icon: 'fa fa-barcode',
      jsx: Faturar,
    },
    {
      name: 'Painel',
      route: 'painel',
      icon: 'fa fa-chart-pie',
      jsx: Painel,
    },
    {
      name: 'Artigo',
      route: 'artigo',
      icon: 'fa fa-box',
      jsx: Artigo,
      childrean: [
        {
          name: 'Novo',
          icon: 'fa fa-plus-circle',
          route: 'novo',
        },
        {
          name: 'Produto',
          icon: 'fa fa-tags',
          route: 'produto',
        },
      ],
    },
    {
      name: 'Stock',
      route: 'stock',
      icon: 'fa fa-boxes',
      jsx: Stock,
      childrean: [
        {
          name: 'Novo',
          icon: 'fa fa-plus-circle',
          route: 'novo',
        },
        {
          name: 'Listagem',
          icon: 'fa fa-list',
          route: 'stock',
        },
        {
          name: 'Entrada',
          icon: 'fas fa-arrow-right',
          route: 'entrada',
        },
        {
          name: 'Saída',
          icon: 'fas fa-arrow-left',
          route: 'saida',
        },
      ],
    },
    {
      name: 'Entidade',
      route: 'entidade',
      icon: 'fa fa-user',
      jsx: Entidade,
      childrean: [
        {
          name: 'Nova',
          icon: 'fa fa-plus-circle',
          route: 'Nova',
        },
        {
          name: 'Cliente',
          icon: 'fas fa-user-tag',
          route: 'cliente',
        },
        {
          name: 'Fornecedor',
          icon: 'fas fa-luggage-cart',
          route: 'fornecedor',
        },
        {
          name: 'Operador',
          icon: 'fas fa-users-cog',
          route: 'operador',
        },
      ],
    },
    {
      name: 'Faturação',
      route: 'faturacao',
      icon: 'fa fa-credit-card',
      jsx: Faturacao,
      childrean: [
        {
          name: 'Vendas',
          icon: 'fas fa-newspaper',
          route: 'vendas',
        },
        {
          name: 'Nota de Crédito',
          icon: 'fas fa-newspaper',
          route: 'notacredito',
          jsx: () => <Nota title="Crédito" />,
        },
        {
          name: 'Nota de Débito',
          icon: 'fas fa-newspaper',
          route: 'notadebito',
          jsx: () => <Nota title="Débito" />,
        },
        {
          name: 'Receita',
          route: 'receita',
        },
        {
          name: 'Venda dia',
          route: 'vendadia',
        },
        {
          name: 'V. Produto',
          route: 'vendaproduto',
        },
        {
          name: 'Proforma',
          route: 'proforma',
        },
      ],
    },
    {
      name: 'Recursos humano',
      route: 'recursoshumano',
      icon: 'fa fa-user-graduate',
    },
    {
      name: 'Tesouraria',
      route: 'tesouraria',
      icon: 'fa fa-cash-register',
    },
    {
      name: 'Taxa',
      icon: 'fas fa-chess-rook',
      route: 'taxa',
      jsx: Taxa,
      childrean: [
        {
          name: 'Nova',
          icon: 'fa fa-plus-circle',
          route: 'nova',
        },
        {
          name: 'Imposto',
          icon: 'fas fa-newspaper',
          route: 'imposto',
        },
        {
          name: 'Encargo',
          route: 'encargo',
        },
        {
          name: 'Despesa',
          route: 'despesa',
        },
        {
          name: 'Desconto',
          route: 'desconto',
        },
      ],
    },
    {
      name: 'Configurações',
      route: 'configuracaoes',
      icon: 'fas fa-cogs',
      childrean: [
        {
          name: 'Personalisar',
          icon: 'fas fa-palette',
          route: 'personalisar',
        },
        {
          name: 'Backup',
          icon: 'fas fa-database',
          route: 'backup',
        },
        {
          name: 'Restore',
          icon: 'fas fa-clock',
          route: 'restore',
        },
      ],
    },
    {
      name: 'Usuário',
      route: 'usuario',
      icon: 'fas fa-user',
      jsx: Usuario,
      childrean: [
        {
          name: 'Novo',
          icon: 'fa fa-plus-circle',
          route: 'novo',
        },
        {
          name: 'Listagem',
          icon: 'fa fa-list',
          route: 'usuario',
        },
        {
          name: 'Permissão',
          icon: 'fas fa-user-shield',
          route: 'permicoesniveltables',
          jsx: Permissoes,
        },
      ],
    },
    {
      name: 'Outras tabela',
      icon: 'fas fa-calendar',
      route: 'outrastabelas',
      jsx: Other,
      childrean: [
        {
          name: 'Categoria',
          icon: 'fas fa-box',
          route: 'categoria',
        },
        {
          name: 'Subcategoria',
          icon: 'fas fa-sitemap',
          route: 'subcategoria',
        },
        {
          name: 'Papel',
          icon: 'fas fa-shield-alt',
          route: 'papel',
        },
        {
          name: 'Estado',
          icon: 'fas fa-toggle-on',
          route: 'estado',
        },
        {
          name: 'Tipo de Artigo',
          icon: 'fas fa-tag',
          route: 'tipoartigo',
        },
        {
          name: 'Nível de Acesso',
          icon: 'fas fa-fingerprint',
          route: 'nivelacesso',
        },
      ],
    },
    {
      name: 'Sair',
      route: '',
      icon: 'fas fa-sign-out-alt',
      onClick: () => {
        logOut()
      },
    },
    {
      name: 'Lista de compras',
      InMenu: false,
      route: 'faturar/listadecompras',
      jsx: Shopping,
    },
    {
      name: 'Pagamento',
      InMenu: false,
      route: 'faturar/listadecompras/pagamento',
      jsx: Formapagamento,
    },
    {
      name: 'Arquivo',
      InMenu: false,
      route: 'arquivo',
      jsx: () => <Report children={print} />,
    },
  ])

  useEffect(() => {
    ;(async () => {
      setUserData(await getUserSession())
    })()
  }, [])

  const isLogged = () => !isEmpty(userData)

  /*

  useEffect(() => {
    localStorage.setItem('UserPreference', JSON.stringify(preference))
  }, [preference])

  /*
  useEffect(() => {
    if (print)
      setMenu(
        menu?.map((item) => {
          return item?.name !== 'Arquivo'
            ? item
            : {
                name: 'Arquivo',
                InMenu: false,
                route: 'arquivo',
                jsx: () => <Report children={print} />,
              }
        }),
      )
  }, [print])*/

  return (
    <UgestContext.Provider
      value={{
        isLogged,
        userData,
        setUserData,
        navigation,
        setNavigation,
        preference,
        setPreference,
        action,
        setAction,
        shopping,
        setShopping,
        multUso,
        setMulUso,
        menu,
        setMenu,
        loader,
        setLoader,
        print,
        setPrint,
      }}
    >
      {children}
    </UgestContext.Provider>
  )
}

export const UseUgest = () => {
  const context = useContext(UgestContext)

  const {
    isLogged,
    navigation,
    setNavigation,
    preference,
    setPreference,
    action,
    setAction,
    shopping,
    setShopping,
    multUso,
    setMulUso,
    menu,
    setMenu,
    loader,
    setLoader,
    print,
    setPrint,
    userData,
    setUserData,
  } = context || {}

  return {
    isLogged,
    userData,
    setUserData,
    navigation,
    setNavigation,
    preference,
    setPreference,
    action,
    setAction,
    shopping,
    setShopping,
    multUso,
    setMulUso,
    menu,
    setMenu,
    loader,
    setLoader,
    print,
    setPrint,
  }
}
