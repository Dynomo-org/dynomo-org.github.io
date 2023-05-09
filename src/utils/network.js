const BASE_URL = import.meta.env.VITE_BASE_URL

const buildURL = (endpoint) => `${BASE_URL}${endpoint}`

const request = async (endpoint, config) => {
    try {
        const response = await fetch(buildURL(endpoint), config)
        const json = await response.json()
        return Promise.resolve({ response: json })
    } catch (err) {
        return Promise.resolve({ err })
    }
}

const network = {
    get: async (endpoint) => {
        return request(endpoint)
    },
    post: async (endpoint, body) => {
        return request(endpoint, { method: 'post', body })
    },
    put: async (endpoint, body) => {
        return request(endpoint, { method: 'put', body })
    },
    delete: async (endpoint) => {
        return request(endpoint, { method: 'delete' })
    }
}

export default network