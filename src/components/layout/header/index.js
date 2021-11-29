import React, { memo, useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import Logo from '../../../assets/images/logo.png'

import Avatar from '../../../assets/images/avatar.png'

import { UseUgest } from '../../view/context'

function Header() {
  const [mode, setLang] = useState({
    mode: false,
  })
  const { shopping, preference, setPreference, setNavigation } = UseUgest()

  useEffect(() => {
    setLang({
      mode: preference?.mode,
    })
  }, [preference?.mode])

  return (
    <header>
      <div>
        <div className="logoBox">
          <img src={Logo} alt="ugest-logo" />
        </div>
        <div></div>
        <div>
          <button
            onClick={() => {
              setLang(!mode)
              setPreference({
                ...preference,
                mode,
              })
              localStorage.setItem('UserPreference', JSON.stringify(mode))
            }}
            className="btn-location"
          >
            <span>
              <i className="fa fa-sun" />
            </span>
            <span className="mode-container">
              <label
                style={{
                  fontWeight: mode ? 'bold' : 'normal',
                }}
              >
                Claro
              </label>{' '}
              |{' '}
              <label
                style={{
                  fontWeight: !mode ? 'bold' : 'normal',
                }}
              >
                Escuro
              </label>
            </span>
          </button>
          <button className="btn">
            <i className="fa fa-bell" />
          </button>
          <button className="btn">
            <i className="fa fa-search" />
          </button>
          <button
            onClick={() => {
              setNavigation({
                menu: 'Lista de compras',
                route: 'listadecompras',
              })
            }}
            className="btn shoppingCount"
          >
            <Link
              to="/faturar/listadecompras"
              style={{
                flex: 1,
              }}
            >
              <i className="fa fa-shopping-basket" />
              {Object.keys(shopping.artigo).length > 0 && (
                <span>{Object.keys(shopping.artigo).length}</span>
              )}
            </Link>
          </button>
          <span className="headerAvatar">
            <img src={Avatar} alt="user" />
          </span>
        </div>
      </div>
    </header>
  )
}
export default memo(Header)
