import { BrowserRouter, Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

import Layout from '@/components/layout'
import './main.css'

const Dashboard = loadable(() => import('@/pages/dashboard'))
const AppMain = loadable(() => import('@/pages/appmain'))
const AppBuild = loadable(() => import('@/pages/appbuild'))
const NotFound = loadable(() => import('@/pages/notfound'))

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route index element={<Dashboard />} />
                    <Route path='apps/:id' element={<AppMain />} />
                    <Route path='apps/:id/content' element={<h1>Content</h1>} />
                    <Route path='apps/:id/build' element={<AppBuild />} />
                    <Route path='apps/:id/*' element={<NotFound />} />
                    <Route path='history' element={<h1>History</h1>} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App