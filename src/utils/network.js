import { AUTH_LOCAL_STORAGE_KEY } from "@/constants/user"
import localStorage from "./localStorage"

const BASE_URL = import.meta.env.VITE_BASE_URL

const buildURL = (endpoint) => `${BASE_URL}${endpoint}`
const buildRequestConfig = config => {
    let result = {
        ...config,
        headers: {
        }
    }
    const token = localStorage.getJSON(AUTH_LOCAL_STORAGE_KEY)?.token || ""
    if (token) {
        result.headers.Authorization = `Bearer ${token}`
    }

    return result
}

const request = async (endpoint, config) => {
    try {
        const response = await fetch(buildURL(endpoint), buildRequestConfig(config))
        const json = await response.json()
        if (response.status < 200 || response.status >= 300) throw new Error(json.error)
        return Promise.resolve({ response: json })
    } catch (err) {
        return Promise.resolve({ err: { message: err.message.replace(/\b\w/g, s => s.toUpperCase()) } })
    }
}

const network = {
    get: async (endpoint, config) => {
        return request(endpoint, config)
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