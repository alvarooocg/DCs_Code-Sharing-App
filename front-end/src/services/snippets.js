import axios from 'axios'
const baseUrl = process.env.API_URL || 'http://localhost:3001/api/snippets'

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = (newSnippet) => {
    const request = axios.post(baseUrl, newSnippet)
    return request.then(response => response.data)
}

const update = (id, updatedSnippet) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedSnippet)
    return request.then(response => response.data)
}

export default { getById, create, update }