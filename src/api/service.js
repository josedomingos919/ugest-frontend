import { isEmpty } from '../util/functions'
import Api from './index'

export const getState = async () => {
  try {
    let res = await Api.get(`/estado/0`)

    return (
      res?.data?.map((e) => ({
        value: e.est_id,
        label: e.est_designacao,
      })) || []
    )
  } catch (e) {
    return []
  }
}

export const getArtigo = async () => {
  try {
    let res = await Api.get(`/tipoartigo`)

    return (
      res?.data?.data?.map(({ tip_id, tip_designacao }) => ({
        value: tip_id,
        label: tip_designacao,
      })) || []
    )
  } catch (e) {
    return []
  }
}

export const getPapel = async () => {
  try {
    let res = await Api.get(`/papel`)

    return (
      res?.data?.data?.map(({ pap_id, pap_designacao }) => ({
        value: pap_id,
        label: pap_designacao,
      })) || []
    )
  } catch (e) {
    return []
  }
}

export const saveUserSession = async (data = {}) => {
  try {
    localStorage.setItem('34hdfg6', btoa(JSON.stringify(data)))
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getUserSession = async () => {
  try {
    const data = atob(localStorage.getItem('34hdfg6') || '')
    return (await JSON.parse(data)) || {}
  } catch (err) {
    console.log(err)
    return {}
  }
}

export const isLogged = () => {
  return !isEmpty(localStorage.getItem('34hdfg6'))
}

export const logOut = () => {
  localStorage.clear()
  window.location.replace(window.location.origin + '/')
}
window.logOut = logOut

export const navigation = {
  navigate(path) {
    window.location.href = window.location.href + path
  },
}
