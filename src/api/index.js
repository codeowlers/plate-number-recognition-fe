import axios from 'axios'
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const dbUrl= publicRuntimeConfig.backendUrl

export const getData = async (url) => {
  try {
    const res = await axios.get(`${dbUrl}/getUrl/${url}`,{headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
    return {
      url: res.data.url,
    }
  } catch (err) {
    return {
      res: err,
    }
  }
}
