import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import network from '@/utils/network';
import { Button, Card, Col, Form, Image, Input, Row, Space, Spin, Typography, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import config from "./config";
import Dragger from "antd/es/upload/Dragger";

const FormTypeConfig = "CONFIG"
const FormTypeString = "STRING"
const FormTypeStyle = "STYLE"

const renderForm = (items) => {
    return items.map((item, index) =>
        <Form.Item key={index} label={item.label} name={item.name} rules={[{ required: item.required, message: `${item.label} is Required` }]}>
            <Input placeholder={item.placeholder} type={item.type || "text"} />
        </Form.Item>
    )
}

const AppMain = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [app, setApp] = useState(null)
    const [appConfigChanged, setAppConfigChanged] = useState(false)
    const [appStyleChanged, setAppStyleChanged] = useState(false)
    const [appStringChanged, setAppStringChanged] = useState(false)

    const [appForm] = useForm()
    const [styleForm] = useForm()
    const [stringForm] = useForm()
    const { forms } = config
    const navigate = useNavigate()

    const appConfig = useMemo(() => {
        if (!app) return {}
        return {
            app_name: app.name,
            package_name: app.package_name,
            version_code: app.version_code,
            version_name: app.version_name,
        }
    }, [app])

    const formMap = useMemo(() => {
        if (!app) return null
        return {
            [FormTypeConfig]: {
                setter: setAppConfigChanged,
                form: appForm,
                base: appConfig,
            },
            [FormTypeStyle]: {
                setter: setAppStyleChanged,
                form: styleForm,
                base: app.app_config.style,
            },
            [FormTypeString]: {
                setter: setAppStringChanged,
                form: stringForm,
                base: app.app_config.strings,
            }
        }
    })


    const onFormChange = formType => {
        const form = formMap[formType]
        if (!form) return
        return form.setter(JSON.stringify(form.base) != JSON.stringify(form.form.getFieldsValue()))
    }

    const onResetForm = formType => {
        const form = formMap[formType]
        if (!form) return
        form.form.setFieldsValue(form.base)
        onFormChange(formType)
    }

    const iconUploadProps = {
        name: 'file',
        showUploadList: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    }

    useEffect(() => {
        const getAppData = async () => {
            setLoading(true)
            const endpoint = `app?id=${id}`
            const { response, err } = await network.get(endpoint)
            if (err) {
                notification.error({
                    title: "Error",
                    description: `Error while getting the app data, please contact the administrator. Message: ${err.message}`
                })
                navigate(-1)
                return
            }

            setApp(response.data)
            setLoading(false)
        }

        getAppData()
    }, [])

    useEffect(() => {
        if (app) {
            appForm.setFieldsValue({
                app_name: app.name,
                package_name: app.package_name,
                version_code: app.version_code,
                version_name: app.version_name
            })
            styleForm.setFieldsValue({ ...app.app_config.style })
            stringForm.setFieldsValue({ ...app.app_config.strings })
        }
    }, [app])

    if (loading || !app) {
        return <Row justify='center' align='middle' style={{ height: '100%' }}><Spin /></Row>
    }

    return (
        <Row justify='start' gutter={16} align='top'>
            <Col span={18}>
                <Space size='large' direction="vertical" style={{ display: 'flex' }}>
                    <Card>
                        <Space direction="vertical" size='small' style={{ display: 'flex' }}>
                            <Typography.Title level={4}>App Info</Typography.Title>
                            <Form form={appForm} labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onChange={() => onFormChange(FormTypeConfig)}>
                                {renderForm(forms.masterApp)}
                            </Form>
                            {appConfigChanged && <Row justify='end'>
                                <Space size='middle'>
                                    <Button onClick={() => onResetForm(FormTypeConfig)}>Reset</Button>
                                    <Button type='primary' onClick={() => onSaveForm(FormTypeConfig)}>Save</Button>
                                </Space>
                            </Row>}
                        </Space>
                    </Card>
                    <Card>
                        <Space direction="vertical" size='large' style={{ display: 'flex' }}>
                            <Typography.Title level={4}>Style Setting</Typography.Title>
                            <Form form={styleForm} labelAlign='left' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onChange={() => onFormChange(FormTypeStyle)}>
                                {renderForm(forms.style)}
                            </Form>
                            {appStyleChanged && <Row justify='end'>
                                <Space size='middle'>
                                    <Button onClick={() => onResetForm(FormTypeStyle)}>Reset</Button>
                                    <Button type='primary' onClick={() => onSaveForm(FormTypeStyle)}>Save</Button>
                                </Space>
                            </Row>}
                        </Space>
                    </Card>
                    <Card>
                        <Space direction="vertical" size='large' style={{ display: 'flex' }}>
                            <Typography.Title level={4}>String Setting</Typography.Title>
                            <Form form={stringForm} labelAlign='left' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onChange={() => onFormChange(FormTypeString)}>
                                {renderForm(forms.string)}
                            </Form>
                            {appStringChanged && <Row justify='end'>
                                <Space size='middle'>
                                    <Button onClick={() => onResetForm(FormTypeString)}>Reset</Button>
                                    <Button type='primary' onClick={() => onSaveForm(FormTypeString)}>Save</Button>
                                </Space>
                            </Row>}
                        </Space>
                    </Card>
                </Space>
            </Col >
            <Col span={6}>
                <Space direction="vertical" size='large' style={{ display: 'flex' }}>
                    <Card>
                        <Space direction="vertical" size='small' style={{ display: 'flex' }}>
                            <Typography.Title level={4}>Logo</Typography.Title>
                            {app.icon_url && <Image src={app.icon_url} />}
                            <Dragger {...iconUploadProps}>
                                <Typography style={{ fontWeight: 'bold' }}>Drag and Drop Your App Icon Here</Typography>
                                <Typography>Only 256 x 256px picture allowed</Typography>
                            </Dragger>
                        </Space>
                    </Card>
                </Space>
            </Col>
        </Row >
    )
}

export default AppMain