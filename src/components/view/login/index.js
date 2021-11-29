import React, { useState, useEffect } from 'react'

import { SHA256, SHA512, HmacSHA1 } from 'crypto-js'

import Logo from '../../../assets/images/logo.png'

import { Input, Button } from '../../layout/form'

import Loader from '../../layout/loader'
import Alert from '../../layout/alert'
import axios from 'axios'

export default function Login({ userData }) {
  const [loader, setLoader] = useState()

  const [alert, setAlert] = useState({
    message: 'Login feito sucesso',
    show: false,
    type: 'success',
  })

  const [user, setUser] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    console.log('Here: ', SHA256('Genilson').toString().length)
    console.log('Here1: ', SHA512('Genilson').toString().length)
    console.log(HmacSHA1('Message', 'Key').toString())
  }, [])

  return (
    <>
      <Loader {...loader} />
      <Alert message={alert.message} show={alert.show} type={alert.type} />
      <main className="loginContainer">
        <div className="logo-box">
          <img src={Logo} alt="Ugest-logo" />
        </div>
        <div className="card">
          <div>
            <div>
              <Input
                icon="fas fa-user"
                label="Email ou usuário"
                placeholder="user@ugest.com"
                type="text"
                onChange={(e) => setUser(e.target.value)}
              />
              <Input
                icon="fas fa-lock"
                label="Senha"
                placeholder="*******"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="logWith">
                <i className="fab fa-github" />
                <i className="fab fa-facebook" />
              </div>
              <div>
                <Button
                  onClick={async () => {
                    sessionStorage.removeItem('authUser')

                    setLoader({
                      state: true,
                      label: 'Validando usuário...',
                    })

                    axios
                      .post('http://127.0.0.1:8000/api/login', {
                        email: user,
                        password: password,
                      })
                      .then(({ data }) => {
                        setAlert({
                          ...alert,
                          show: true,
                        })

                        console.log('000', data)

                        sessionStorage.setItem('authUser', JSON.stringify(data))
                        userData(data)
                      })
                      .catch((error) => {
                        console.log('error', error)
                        setAlert({
                          ...alert,
                          type: 'error',
                          show: true,
                          message: 'Email ou senha incorrecta',
                        })
                        userData(false)
                      })
                      .finally(() => {
                        setLoader({
                          state: false,
                          label: null,
                        })
                        setTimeout(() => {
                          setAlert({
                            ...alert,
                            show: false,
                          })
                        }, 2000)
                      })
                  }}
                >
                  Entrar
                  <i className="fa fa-sign-in-alt" />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <a href="/">Esqueceu a sua senha ?</a>
          </div>
        </div>
      </main>
    </>
  )
}
