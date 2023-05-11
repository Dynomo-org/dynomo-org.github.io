import { useState } from "react"
import { useParams } from "react-router-dom"

import network from '@/utils/network';
import { Button, Card, Col, Form, Input, Row, Select, Space, Typography, Upload, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import config from "./config";
import { DownloadOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons";

const refreshIntervalMills = 500
const generateStatusSuccess = 1
const generateStatusFail = 2
const renderForm = (items) => {
    return items.map((item, index) =>
        <Form.Item key={index} label={item.label} name={item.name} rules={[{ required: item.required, message: `${item.label} is Required` }]}>
            <Input placeholder={item.placeholder} type={item.type || "text"} />
        </Form.Item>
    )
}

const { forms } = config
const { Option } = Select
const AppMain = () => {
    const { id } = useParams()

    const [loadingKeystore, setLoadingKeystore] = useState(false)
    const [keystoreURL, setKeystoreURL] = useState("")

    const [formKeystore] = useForm()
    const [formBuild] = useForm()

    const onGenerateKeystore = async () => {
        try {
            await formKeystore.validateFields()
        } catch (err) {
            return
        }

        setLoadingKeystore(true)
        const payload = { app_id: id, ...formKeystore.getFieldsValue() }
        const { err } = await network.post("keystore", JSON.stringify(payload))
        if (err) {
            notification.error({ title: "Error", description: "Error While Initiating Keystore" })
            setLoadingKeystore(false)
            return
        }
        getGenerateStatus()
    }

    const getGenerateStatus = async () => {
        const url = `keystore?app_id=${id}`
        const task = setInterval(async () => {
            const { response, err } = await network.get(url)
            if (err) {
                clearInterval(task)
                return
            }
            if (response.data.status == generateStatusSuccess) {
                setKeystoreURL(response.data.url)
                notification.success({ title: 'Success', description: "Keystore generated successfully" })
                setLoadingKeystore(false)
                clearInterval(task)
                return
            } else if (response.data.status == generateStatusFail) {
                notification.error({ title: 'Error', description: `Error Generating Keystore, Error: ${response.data.error_message}` })
                setLoadingKeystore(false)
                clearInterval(task)
                return
            }
        }, refreshIntervalMills)
    }

    return (
        <Row justify='start' gutter={16} align='top'>
            <Col xs={24} md={12}>
                <Space size='large' direction="vertical" style={{ display: 'flex' }}>
                    <Card>
                        <Space direction="vertical" size='small' style={{ display: 'flex' }}>
                            <Typography.Title level={4}>Keystore</Typography.Title>
                            <Form form={formKeystore} labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                {renderForm(forms.keystore)}
                            </Form>
                            <Row justify='end'>
                                <Space size='middle'>
                                    <Button onClick={() => formKeystore.resetFields()}>Reset</Button>
                                    <Button
                                        type='primary'
                                        onClick={onGenerateKeystore}
                                        icon={loadingKeystore && <LoadingOutlined />}>{loadingKeystore ? "Generating" : "Generate"}</Button>
                                    {keystoreURL && (
                                        <a href={keystoreURL}>
                                            <Button type='primary' danger icon={<DownloadOutlined />}>Download</Button>
                                        </a>
                                    )}
                                </Space>
                            </Row>
                        </Space>
                    </Card>
                </Space>
            </Col >
            <Col xs={24} md={12}>
                <Space direction="vertical" size='large' style={{ display: 'flex' }}>
                    <Card>
                        <Space direction="vertical" size='small' style={{ display: 'flex' }}>
                            <Typography.Title level={4}>Build</Typography.Title>
                            <Form form={formBuild} labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                <Form.Item label="Keystore" name="keystore" required>
                                    <Upload listType="text">
                                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="Alias" name="alias" required>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Key Password" name="key_password" required>
                                    <Input type="password" />
                                </Form.Item>
                                <Form.Item label="App Type" name="app_type" required>
                                    <Select value="aab">
                                        <Option value="aab">AAB</Option>
                                        <Option value="apk">APK</Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                            <Row justify='end'>
                                <Space size='middle'>
                                    <Button onClick={() => formBuild.resetFields()}>Reset</Button>
                                    <Button type='primary'>Build</Button>
                                </Space>
                            </Row>
                        </Space>
                    </Card>
                </Space>
            </Col>
        </Row >
    )
}

export default AppMain