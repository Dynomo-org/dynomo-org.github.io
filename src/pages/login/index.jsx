import { AppContext } from "@/contexts/app"
import { LoadingOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Row, Typography, notification } from "antd"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const { userStore: { user, loginUser } } = useContext(AppContext)
    const navigate = useNavigate()

    const onLoginClick = async (value) => {
        loginUser(value)
    }

    useEffect(() => {
        if (user.error) {
            notification.error({ description: user.error.message })
        }
    }, [user.error])

    useEffect(() => {
        if (user.data) {
            navigate('/')
        }
    }, [user.data, navigate])

    return <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Card>
            <Typography.Title >Login</Typography.Title>
            <Form onFinish={onLoginClick}>
                <Form.Item name="email" rules={[{ required: true, message: "Email must be filled" }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Password must be filled" }]}>
                    <Input placeholder="Password" type="password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={user.loading && <LoadingOutlined />}>Login</Button>
                </Form.Item>
            </Form>
        </Card>
    </Row>
}

export default Login