import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { Button, Card, Col, Form, Image, Input, Row, Space, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import Dragger from "antd/es/upload/Dragger";
import { LoadingOutlined } from "@ant-design/icons";
import network from '@/utils/network';
import image from "@/utils/image";
import config from "./config";
import { AppContext } from "@/contexts/app";
import loadable from "@loadable/component";
import notification from "@/utils/notification";

const Loading = loadable(() => import("@/components/loading"))

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

const { forms } = config
const AppMain = () => {
    const { id } = useParams()
    const { appStore: { app: { data: app, loading }, fetchApp } } = useContext(AppContext)

    const [loadingIconUpdate, setLoadingIconUpdate] = useState(false)
    const [loadingUpdateApp, setLoadingUpdateApp] = useState(false)
    const [loadingUpdateStyle, setLoadingUpdateStyle] = useState(false)
    const [loadingUpdateString, setLoadingUpdateString] = useState(false)

    const [appConfigChanged, setAppConfigChanged] = useState(false)
    const [appStyleChanged, setAppStyleChanged] = useState(false)
    const [appStringChanged, setAppStringChanged] = useState(false)
    const [appIconUpload, setAppIconUpload] = useState()

    const [appForm] = useForm()
    const [styleForm] = useForm()
    const [stringForm] = useForm()

    const appConfig = useMemo(() => {
        if (!app) return {}
        return {
            name: app.name,
            package_name: app.package_name,
            version_code: app.version_code,
            version_name: app.version_name,
        }
    }, [app])

    const appStyle = useMemo(() => {
        if (!app) return {}
        return {
            name: app.name,
            color_primary: app.color_primary,
            color_primary_variant: app.color_primary_variant,
            color_on_primary: app.color_on_primary,
        }
    }, [app])

    const appString = useMemo(() => {
        if (!app) return {}
        return JSON.parse(app.strings)
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
                base: appStyle,
                setLoading: setLoadingUpdateStyle,
                constructObj: () => ({ id: app.id, ...styleForm.getFieldsValue() })
            },
            [FormTypeString]: {
                setter: setAppStringChanged,
                form: stringForm,
                base: appString,
                setLoading: setLoadingUpdateString,
                constructObj: () => ({ id: app.id, ...stringForm.getFieldsValue() })
            }
        }
    }, [app, appConfig, appForm, styleForm, stringForm, appStyle, appString])

    const iconUploadProps = useMemo(() => ({
        name: 'file',
        showUploadList: false,
        fileList: appIconUpload?.file ? [appIconUpload.file] : [],
        beforeUpload: async (file) => {
            if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
                notification.error("App icon should be a png, jpg, or jpeg")
                return false
            }
            if (file.size >= IconFileSizeLimit) {
                notification.error("App icon size should be less than 500 KB")
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
        try {
            await form.form.validateFields()
        } catch (err) {
            return
        }
        form.setLoading(true)
        const { err } = await network.put("app", JSON.stringify(form.constructObj()))
        if (err) {
            notification.error(`Error updating app ${form.text}. Message: ${err.message}`)
            form.setLoading(false)
            return
        }
        await fetchApp(id)
        form.setter(false)
        form.setLoading(false)
        notification.success(`App ${formType.toLowerCase()} updated successfully`)
    }

    const onUpdateAppIcon = async () => {
        setLoadingIconUpdate(true)
        const form = new FormData()
        form.append("icon", appIconUpload.file)
        form.append("app_id", id)
        const { err } = await network.put('app/icon', form)
        if (err) {
            notification.error(`Error while updating the app icon, please contact the administrator. Message: ${err.message}`)
            setLoadingIconUpdate(false)
            return
        }
        setAppIconUpload(null)
        fetchApp(id)
        setLoadingIconUpdate(false)
        notification.success("App icon updated successfully")
    }

    useEffect(() => {
        fetchApp(id)
    }, [fetchApp, id])

    useEffect(() => {
        if (appConfig) appForm.setFieldsValue({ ...appConfig })
        if (appStyle) styleForm.setFieldsValue({ ...appStyle })
        if (appString) stringForm.setFieldsValue({ ...appString })
    }, [appConfig, appStyle, appString, appForm, styleForm, stringForm])

    if (loading || !app) {
        return <Loading />
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
                    {app.type !== 0 && (
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
                    )}
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