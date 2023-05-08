import {HomeOutlined, HistoryOutlined, DollarOutlined, ToolOutlined} from '@ant-design/icons'

const appId = "app_id"
export default {
    '': [
        {
            icon: <HomeOutlined />,
            label: "Apps",
            key: "/"
        }, {
            icon: <HistoryOutlined />,
            label: "Content",
            key: `/apps/${appId}/content`
        }, {
            icon: <DollarOutlined />,
            label: "Monetization",
            key: `/apps/${appId}/monetization`
        }, {
            icon: <ToolOutlined />,
            label: "Build",
            key: `/apps/${appId}/build`
        }
    ],
    apps: [
        {
            icon: <HomeOutlined />,
            label: "Apps",
            key: "/"
        }, {
            icon: <HistoryOutlined />,
            label: "Content",
            key: "#content"
        }
    ]
}