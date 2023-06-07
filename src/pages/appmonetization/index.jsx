import { AppContext } from "@/contexts/app"
import loadable from "@loadable/component"
import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Table, Typography } from "antd"
import { useForm } from "antd/es/form/Form"
import { useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import config from './index.config'
import LoadingOverlay from "@/components/loadingoverlay"
import network from "@/utils/network"
import notification from "@/utils/notification"

const Loading = loadable(() => import("@/components/loading"))
const adTypeMap = {
    1: "Admob"
}

const tableColumns = [
    {
        dataIndex: "id",
        key: 'id'
    },
    {
        dataIndex: "type",
        key: 'type',
        render: data => adTypeMap[data]
    }
]

const AppMonetization = () => {
    const { id } = useParams()
    const { appStore: { app: { data: app, loading: loadingApp }, fetchApp } } = useContext(AppContext)

    const [ads, setAds] = useState([])
    const [adsSetting, setAdsSetting] = useState(null)
    const [adsSettingChanged, setAdsSettingChanged] = useState(false)
    const [isAddAdsModalOpen, setIsAddAdsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingAddAds, setLoadingAddAds] = useState(false)
    const [selectedAdsType, setSelectedAdsType] = useState(config.ads_types[0].value)

    const [addAdsForm] = useForm()

    const defaultAdsSetting = useMemo(() => {
        if (!app) return {}
        return {
            enable_banner: app.enable_banner,
            enable_interstitial: app.enable_interstitial,
            enable_native: app.enable_native,
            enable_open: app.enable_open,
            enable_reward: app.enable_reward,
        }
    }, [app])

    const onAdsConfigChange = (key, value) => {
        const newValue = { ...adsSetting, [key]: value }
        setAdsSetting(newValue)
    }

    const onSaveAdsSetting = async () => {
        setLoading(true)
        const { err } = await network.put('app', JSON.stringify({ id: app.id, ...adsSetting }))
        if (err) {
            notification.error(err.message)
            setLoading(false)
            return
        }

        await fetchApp(id)
        notification.success("Success edit the ads setting")
        setLoading(false)
    }

    const onEnableAllAds = async () => {
        setLoading(true)
        const newValue = Object.keys(adsSetting).reduce((acc, key) => ({ ...acc, [key]: true }), { id: app.id })
        const { err } = await network.put('app', JSON.stringify(newValue))
        if (err) {
            notification.error(err.message)
            setLoading(false)
            return
        }

        await fetchApp(id)
        notification.success("Success edit the ads setting")
        setLoading(false)
    }

    const onDisableAllAds = async () => {
        setLoading(true)
        const newValue = Object.keys(adsSetting).reduce((acc, key) => ({ ...acc, [key]: false }), { id: app.id })
        const { err } = await network.put('app', JSON.stringify(newValue))
        if (err) {
            notification.error(err.message)
            setLoading(false)
            return
        }

        await fetchApp(id)
        notification.success("Success edit the ads setting")
        setLoading(false)
    }

    const onAddAdsSubmit = async () => {
        setLoadingAddAds(true)
        const payload = {
            ...addAdsForm.getFieldsValue(),
            app_id: app.id,
            type: Number(selectedAdsType),
        }
        const { err } = await network.post("ads", JSON.stringify(payload))
        if (err) {
            notification.error(err.message)
            setLoadingAddAds(false)
            return
        }

        notification.success("Success adding ads")
        setLoadingAddAds(false)
        setIsAddAdsModalOpen(false)
    }

    useEffect(() => {
        if (!app) {
            fetchApp(id)
            return
        }

        setAdsSetting({
            enable_banner: app.enable_banner,
            enable_interstitial: app.enable_interstitial,
            enable_native: app.enable_native,
            enable_open: app.enable_open,
            enable_reward: app.enable_reward,
        })
    }, [app, fetchApp, id])

    useEffect(() => {
        setAdsSettingChanged(JSON.stringify(adsSetting) != JSON.stringify(defaultAdsSetting))
    }, [adsSetting, defaultAdsSetting])

    useEffect(() => {
        const fetchAds = async () => {
            const { response, err } = await network.get(`ads?id=${app.id}`)
            if (err) {
                notification.error(err.message)
                return
            }
            setAds(response.data)
        }

        if (app) {
            fetchAds()
        }
    }, [app])

    if (loadingApp || !app) {
        return <Loading />
    }

    return (
        <>
            {loading && <LoadingOverlay />}
            <Row justify='start' gutter={16} align='top'>
                <Col span={14}>
                    <Space size='large' direction="vertical" style={{ display: 'flex' }}>
                        <Card>
                            {adsSetting && (
                                <Space direction="vertical" size='small' style={{ display: 'flex' }}>
                                    <Typography.Title level={4}>Ads Configuration</Typography.Title>
                                    <Form labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        {config.ads_configs.map(item => (
                                            <Form.Item key={item.name} label={item.label} valuePropName="checked">
                                                <Select
                                                    labelInValue
                                                    value={{ value: adsSetting[item.name] }}
                                                    options={[{ value: true, label: "Enable" }, { value: false, label: "Disable" }]}
                                                    onChange={({ value }) => onAdsConfigChange(item.name, value)} />
                                            </Form.Item>
                                        )
                                        )}
                                    </Form>
                                    <Row justify='end'>
                                        <Space size='middle'>
                                            <Button type='primary' onClick={onEnableAllAds}>Enable All</Button>
                                            <Button onClick={onDisableAllAds}>Disable All</Button>
                                            {adsSettingChanged && <Button type='primary' onClick={onSaveAdsSetting} >Save</Button>}
                                        </Space>
                                    </Row>
                                </Space>
                            )}
                        </Card>
                    </Space>
                </Col>
                <Col span={10}>
                    <Table
                        showHeader={false}
                        dataSource={ads}
                        columns={tableColumns}
                        pagination={false}
                    />
                    <Button type='primary' onClick={() => setIsAddAdsModalOpen(true)} style={{ width: "100%", marginTop: 16 }}>Add Ads</Button>
                </Col>
            </Row>
            <Modal
                title="Add New Ads"
                open={isAddAdsModalOpen}
                onOk={onAddAdsSubmit}
                onCancel={() => setIsAddAdsModalOpen(false)}
                confirmLoading={loadingAddAds}
                closable={false}>
                <Form form={addAdsForm} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label="Ads Type" name="type" valuePropName="checked">
                        <Select
                            labelInValue
                            value={{ value: selectedAdsType }}
                            onChange={setSelectedAdsType}
                            options={config.ads_types}
                        />
                    </Form.Item>
                    <Form.Item label="Open Ads ID" name="open_ad_id">
                        <Input placeholder="ca-app-pub-xxxxxx" />
                    </Form.Item>
                    <Form.Item label="Banner Ads ID" name="banner_ad_id">
                        <Input placeholder="ca-app-pub-xxxxxx" />
                    </Form.Item>
                    <Form.Item label="Interstitial Ads ID" name="interstitial_ad_id">
                        <Input placeholder="ca-app-pub-xxxxxx" />
                    </Form.Item>
                    <Form.Item label="Reward Ads ID" name="reward_ad_id">
                        <Input placeholder="ca-app-pub-xxxxxx" />
                    </Form.Item>
                    <Form.Item label="Native Ads ID" name="native_ad_id">
                        <Input placeholder="ca-app-pub-xxxxxx" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AppMonetization