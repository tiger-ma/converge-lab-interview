const axios = require('axios')

export const getPages = (query) => {
  let data = JSON.stringify({
    q: query,
  })
  let config = {
    method: 'post',
    url: 'https://google.serper.dev/search',
    headers: {
      'X-API-KEY': 'bda612936a53c5acda1de463c5b5a6e0edd123b7',
      'Content-Type': 'application/json',
    },
    data: data,
  }

  return axios(config)
}
