import axios from 'axios'
const baseUrl = 'api/snippets'

const getSnippet = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = (newSnippet) => {
    const request = axios.post(baseUrl, newSnippet)
    return request.then(response => response.data)
}

export default { getSnippet, create  }