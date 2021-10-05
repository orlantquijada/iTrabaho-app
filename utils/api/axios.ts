import a from 'axios'

const axios = a.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/'
      : 'https://itrabaho-api.herokuapp.com/',
})

export default axios
