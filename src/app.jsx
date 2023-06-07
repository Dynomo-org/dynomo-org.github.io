import { useContext } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

import './main.css'
import Layout from '@/components/layout'
import { AppContext, AppContextProvider } from '@/contexts/app'

const AppMain = loadable(() => import('@/pages/appmain'))
const AppContent = loadable(() => import('@/pages/appcontent'))
const AppBuild = loadable(() => import('@/pages/appbuild'))
const AppMonetization = loadable(() => import('@/pages/appmonetization'))
const Dashboard = loadable(() => import('@/pages/dashboard'))
const Login = loadable(() => import('@/pages/login'))
const NotFound = loadable(() => import('@/pages/notfound'))

const ProtectedRoute = () => {
    const { userStore: { user } } = useContext(AppContext)
    if (user.loading) {
        return <p>Loading...</p>
    }
    return user ? <Outlet /> : <Navigate to="/login" />
}

const App = () => {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />} >
                        <Route element={<Layout />}>
                            <Route index element={<Dashboard />} />
                            <Route path='apps/:id' element={<AppMain />} />
                            <Route path='apps/:id/content' element={<AppContent />} />
                            <Route path='apps/:id/build' element={<AppBuild />} />
                            <Route path='apps/:id/monetization' element={<AppMonetization />} />
                            <Route path='apps/:id/*' element={<NotFound />} />
                            <Route path='history' element={<h1>History</h1>} />
                        </Route>
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AppContextProvider>
    )
}

export default App