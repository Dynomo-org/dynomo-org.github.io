import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import network from '@/utils/network';
import { Button, Card, Col, Form, Image, Input, Row, Space, Spin, Typography, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import config from "./config";
import Dragger from "antd/es/upload/Dragger";
import image from "@/utils/image";
import { LoadingOutlined } from "@ant-design/icons";

const FormTypeConfig = "CONFIG"
const FormTypeString = "STRINGS"
const FormTypeStyle = "STYLE"

const IconFileSizeLimit = 1024 * 1024 * 0.5 // 0.5 MB

const renderForm = (items) => {
    return items.map((item, index) =>
        <Form.Item key={index} label={item.label} name={item.name} rules={[{ required: item.required, message: `${item.label} is Required` }]}>
            <Input placeholder={item.placeholder} type={item.type || "text"} />
        </Form.Item>
    )
}

const AppMain = () => {
    const { id } = useParams()

    const [loadingApp, setLoadingApp] = useState(false)
    const [loadingIconUpdate, setLoadingIconUpdate] = useState(false)
    const [loadingUpdateApp, setLoadingUpdateApp] = useState(false)
    const [loadingUpdateStyle, setLoadingUpdateStyle] = useState(false)
    const [loadingUpdateString, setLoadingUpdateString] = useState(false)

    const [app, setApp] = useState(null)
    const [appConfigChanged, setAppConfigChanged] = useState(false)
    const [appStyleChanged, setAppStyleChanged] = useState(false)
    const [appStringChanged, setAppStringChanged] = useState(false)
    const [appIconUpload, setAppIconUpload] = useState()

    const [appForm] = useForm()
    const [styleForm] = useForm()
    const [stringForm] = useForm()
    const { forms } = config
    const navigate = useNavigate()

    const appConfig = useMemo(() => {
        if (!app) return {}
        return {
            name: app.name,
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
                setLoading: setLoadingUpdateApp,
                constructObj: () => ({ id: app.id, ...appForm.getFieldsValue() })
            },
            [FormTypeStyle]: {
                setter: setAppStyleChanged,
                form: styleForm,
                base: app.app_config.style,
                setLoading: setLoadingUpdateStyle,
                constructObj: () => ({ id: app.id, app_config: { style: { ...styleForm.getFieldsValue() } } })
            },
            [FormTypeString]: {
                setter: setAppStringChanged,
                form: stringForm,
                base: app.app_config.strings,
                setLoading: setLoadingUpdateString,
                constructObj: () => ({ id: app.id, app_config: { strings: { ...stringForm.getFieldsValue() } } })
            }
        }
    }, [app, appConfig, appForm, styleForm, stringForm])

    const iconUploadProps = useMemo(() => ({
        name: 'file',
        showUploadList: false,
        fileList: appIconUpload?.file ? [appIconUpload.file] : [],
        beforeUpload: async (file) => {
            if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
                notification.error({ title: "Error", description: "App icon should be a png, jpg, or jpeg" })
                return false
            }
            if (file.size >= IconFileSizeLimit) {
                notification.error({ title: "Error", description: "App icon size should be less than 500 KB" })
                return false
            }

            const base64 = await image.getBase64(file)
            setAppIconUpload({ base64, file })
            return false;
        },
    }), [appIconUpload])


    const onFormChange = useCallback(formType => {
        const form = formMap[formType]
        if (!form) return
        form.setter(JSON.stringify(form.base) != JSON.stringify(form.form.getFieldsValue()))
    }, [formMap])

    const onResetForm = formType => {
        const form = formMap[formType]
        if (!form) return
        form.form.setFieldsValue(form.base)
        onFormChange(formType)
    }

    const onSaveForm = async (formType) => {
        const form = formMap[formType]
        if (!form) return
        form.setLoading(true)
        const { err } = await network.put("app", JSON.stringify(form.constructObj()))
        if (err) {
            notification.error({
                title: "Error",
                description: `Error updating app ${form.text}. Message: ${err.message}`
            })
            form.setLoading(false)
            return
        }
        await getAppData()
        form.setter(false)
        form.setLoading(false)
        notification.success({
            title: "Success",
            description: `App ${formType.toLowerCase()} updated successfully`
        })
    }

    const onUpdateAppIcon = async () => {
        setLoadingIconUpdate(true)
        const form = new FormData()
        form.append("icon", appIconUpload.file)
        form.append("app_id", app.id)
        const { err } = await network.put('app/icon', form)
        if (err) {
            notification.error({
                title: "Error",
                description: `Error while updating the app icon, please contact the administrator. Message: ${err.message}`
            })
            setLoadingIconUpdate(false)
            return
        }
        setAppIconUpload(null)
        getAppData()
        setLoadingIconUpdate(false)
        notification.success({
            title: "Success",
            description: "App icon updated successfully"
        })
    }

    const getAppData = useCallback(async (useGlobalLoading = false) => {
        useGlobalLoading && setLoadingApp(true)
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
        useGlobalLoading && setLoadingApp(false)
    }, [id, navigate])

    useEffect(() => {
        getAppData(true)
    }, [getAppData])

    useEffect(() => {
        if (app) {
            appForm.setFieldsValue({
                name: app.name,
                package_name: app.package_name,
                version_code: app.version_code,
                version_name: app.version_name
            })
            styleForm.setFieldsValue({ ...app.app_config.style })
            stringForm.setFieldsValue({ ...app.app_config.strings })
        }
    }, [app, appForm, styleForm, stringForm])

    if (loadingApp || !app) {
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
                                    <Button
                                        type='primary'
                                        onClick={() => onSaveForm(FormTypeConfig)}
                                        icon={loadingUpdateApp && <LoadingOutlined />}>Save</Button>
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
                                    <Button
                                        type='primary'
                                        onClick={() => onSaveForm(FormTypeStyle)}
                                        icon={loadingUpdateStyle && <LoadingOutlined />}>Save</Button>
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
                                    <Button
                                        type='primary'
                                        onClick={() => onSaveForm(FormTypeString)}
                                        icon={loadingUpdateString && <LoadingOutlined />}>Save</Button>
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
                                {appIconUpload?.base64 ?
                                    <Image preview={false} src={appIconUpload.base64} style={{ width: '100%' }} /> :
                                    <>
                                        <Typography style={{ fontWeight: 'bold' }}>Drag and Drop or Select Your App Icon Here</Typography>
                                        <Typography>256x256 px is recommended</Typography>
                                    </>
                                }
                            </Dragger>
                            {appIconUpload?.base64 && <Row justify='end'>
                                <Button
                                    type='primary'
                                    size="large"
                                    style={{ width: '100%' }}
                                    icon={loadingIconUpdate && <LoadingOutlined />}
                                    onClick={onUpdateAppIcon}>Update Icon</Button>
                            </Row>}
                        </Space>
                    </Card>
                </Space>
            </Col>
        </Row >
    )
}

export default AppMain