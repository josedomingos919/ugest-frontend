import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/view/login'
import Routes from './router'
import { UgestProvider } from './components/view/context'
import './index.css'
import './styles/faturacao.css'
import { isLogged } from './api/service'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const App = () => {
  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        component={() => {
          if (isLogged()) return <Redirect to="/faturar" />

          return (
            <Login
              userData={(e) => {
                if (!e) return
                setTimeout(() => {
                  window.location.href = window.location.href + 'faturar'
                }, 2000)
              }}
            />
          )
        }}
      />
      <Route
        path="/faturar"
        exact
        component={() => {
          if (!isLogged()) return <Redirect to="/" />

          return (
            <UgestProvider>
              <Routes />
            </UgestProvider>
          )
        }}
      />
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
