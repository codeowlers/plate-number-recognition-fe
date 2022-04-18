import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const dbUrl = publicRuntimeConfig.backendUrl

// eslint-disable-next-line default-param-last
export const getData = async (epochs = 1, url) => {
  console.log({ epochs, url })
  try {
    const res = await axios.get(`${dbUrl}/run?epochs=${epochs}&url=${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return {
      plate_contour: res.data.plate_contour,
      plate_segmented: res.data.plate_segmented,
      predictions: res.data.predictions,
      plate_number: res.data.plate_number,
    }
  } catch (err) {
    return {
      res: err,
    }
  }
}
