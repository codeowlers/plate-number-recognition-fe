import axios from 'axios'

export const getData = async (url) => {
  try {
    const res = await axios.get(`/api?url=${url}`)
    return {
      data: res.data.message,
    }
  } catch (err) {
    return {
      res: err,
    }
  }
}
