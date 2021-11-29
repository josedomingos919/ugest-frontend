import React, { memo, useEffect, useState } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/layout/header'

import Loader from './components/layout/loader'

import { UseUgest } from './components/view/context'

import Aside from './components/layout/aside'

function Admin() {
  const { preference, menu, navigation, loader } = UseUgest()

  const [route, setRoute] = useState()

  const [routes, setRoutes] = useState([])

  useEffect(() => {
    let mJoin = []

    menu.forEach(({ childrean, ...mainItem }) => {
      if (childrean) {
        mJoin.push({ ...mainItem, route: mainItem?.route + '/:childrean' })
        childrean.forEach((item) => {
          mJoin.push({ ...item, route: mainItem?.route + '/' + item?.route })
        })
      } else mJoin.push({ ...mainItem })
    })

    setRoutes(mJoin)
  }, [menu])

  useEffect(() => {
    if (!navigation) return
    setRoute(navigation)
  }, [navigation])

  return (
    <BrowserRouter>
      <main mode={preference.mode ? 'Escuro' : 'Claro'}>
        <Aside />
        <div>
          <Header />
          <div className="masterContainer">
            {route &&
              route.menu !== 'Painel' &&
              route.menu !== 'Faturar' &&
              route.menu !== 'Arquivo' &&
              Object.keys({ ...route }).length > 0 && (
                <div className="navscale">
                  {route.submenu ? (
                    <span>
                      {route.menu}
                      <i className="fa fa-chevron-right" />
                      {route.submenu}
                    </span>
                  ) : (
                    <span>{route.menu}</span>
                  )}
                </div>
              )}
            <Loader {...loader} />
            <main className="mainContent">
              {routes.map(({ route, jsx }, index) => {
                return (
                  jsx && (
                    <Route
                      key={index}
                      path={`/${route}`}
                      exact
                      component={jsx || <div />}
                    />
                  )
                )
              })}
            </main>
          </div>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default memo(Admin)
