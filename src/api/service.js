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
