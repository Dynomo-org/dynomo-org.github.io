import { createContext, useCallback, useEffect, useState } from 'react'

import network from '@/utils/network'
import localStorage from '@/utils/localStorage'
import { AUTH_LOCAL_STORAGE_KEY } from '@/constants/user'

const defaultState = {
    data: null,
    loading: false,
    error: null
}

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [app, setApp] = useState(defaultState)
    const [user, setUser] = useState(defaultState)

    const fetchApp = useCallback(async (id, useGlobalLoading = false) => {
        useGlobalLoading && setApp(app => ({ ...app, loading: true }))
        const endpoint = `app?id=${id}`
        const { response, err } = await network.get(endpoint)
        if (err) {
            setApp(app => ({ ...app, error: err, loading: useGlobalLoading ? false : app.loading }))
            return
        }

        setApp(app => ({ ...app, data: response.data, loading: useGlobalLoading ? false : app.loading }))
    }, [])

    const fetchUserInfo = async () => {
        const userLocal = localStorage.getJSON(AUTH_LOCAL_STORAGE_KEY)
        if (userLocal) {
            setUser(user => ({ ...user, loading: true }))
            const { response, err } = await network.get("user/info")
            if (err) {
                setUser(user => ({ ...user, loading: false, err: err }))
                return
            }
            setUser(user => ({ ...user, data: response.data, loading: false }))
        }
    }

    const loginUser = useCallback(async (payload) => {
        setUser(user => ({ ...user, loading: true }))
        const { response, err } = await network.post('user/login', JSON.stringify(payload))
        if (err) {
            setUser(user => ({ ...user, loading: false, error: err }))
            return
        }

        localStorage.setJSON(AUTH_LOCAL_STORAGE_KEY, response.data)
        setUser(user => ({ ...user, loading: false, error: err }))
        fetchUserInfo()
    }, [])

    useEffect(() => {
        fetchUserInfo()
    }, [])

    const appStore = { app, fetchApp }
    const userStore = { user, loginUser }
    return (
        <AppContext.Provider value={{ appStore, userStore }}>
            {children}
        </AppContext.Provider>
    )
}
