import {
    Layout, Menu
} from 'antd'
import {
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom'
import NavMenu from '@/routes/navmenu'

const { Sider } = Layout
const Sidebar = () => {
    const { pathname } = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()

    const menu = NavMenu.get({ appID: id })
    return <Sider
        className='sider'
        breakpoint='lg'
        collapsible
    >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme='dark' selectedKeys={[pathname]} items={menu[pathname.split('/')[1]]} onClick={({ key }) => navigate(key)} />
    </Sider>
}

export default Sidebar