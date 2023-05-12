import { HomeOutlined, HistoryOutlined, ToolOutlined, DollarOutlined } from '@ant-design/icons'

export default {
    get: ({ appID }) => ({
        '': [
            {
                icon: <HomeOutlined />,
                label: "Apps",
                key: "/"
            }, {
                icon: <HistoryOutlined />,
                label: "Build History",
                key: "/history"
            }
        ],
        history: [
            {
                icon: <HomeOutlined />,
                label: "Apps",
                key: "/"
            }, {
                icon: <HistoryOutlined />,
                label: "Build History",
                key: "/history"
            }
        ],
        apps: [
            {
                icon: <HomeOutlined />,
                label: "Apps",
                key: "/"
            },
            {
                icon: <HistoryOutlined />,
                label: "Content",
                key: `/apps/${appID}/content`
            },
            {
                icon: <DollarOutlined />,
                label: "Monetization",
                key: `/apps/${appID}/monetization`
            },
            {
                icon: <ToolOutlined />,
                label: "Build",
                key: `/apps/${appID}/build`
            }
        ]
    })
}