import { Layout } from 'antd'
import Sidebar from './sidebar'
import './index.css'
import { Outlet } from 'react-router-dom'

const { Header, Content} = Layout
const MainLayout = () => {
    return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header className='header'>
                        Header
                    </Header>
                    <Content className='content'>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
    )
}

export default MainLayout