import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const dbUrl = publicRuntimeConfig.backendUrl

export const getData = async (url) => {
  try {
    const res = await axios.get(`${dbUrl}/run?url=${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return {
      url: res.data.url,
      plateNumber: res.data.plateNumber,
    }
  } catch (err) {
    return {
      res: err,
    }
  }
}
