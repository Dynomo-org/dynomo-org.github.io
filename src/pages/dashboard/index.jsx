import { useState, useEffect, useCallback } from 'react';
import { Typography, Table, notification, Row, Col, Button, Modal, Form, Input, Tooltip, Image } from 'antd';
import './index.css'
import network from '@/utils/network';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';

const getTableColumns = ({ onDelete }) => [
    {
        dataIndex: "icon_url",
        key: "icon_url",
        width: '64px',
        render: data => <Image src={data} width={64} height={64}/>
    },
    {
        dataIndex: "name",
        key: 'id'
    },
    {
        title: "Package Name",
        dataIndex: "package_name",
        key: 'id'
    },
    {
        title: "Created Date",
        dataIndex: "created_at",
        key: 'created_at',
        render: data => {
            const date = new Date(data);
            const options = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };

            const formatter = new Intl.DateTimeFormat('en-US', options);
            return formatter.format(date);
        }
    },
    {
        title: "Updated Date",
        dataIndex: "updated_at",
        key: 'updated_at',
        render: data => {
            if (!data) return
            const date = new Date(data);
            const options = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };

            const formatter = new Intl.DateTimeFormat('en-US', options);
            return formatter.format(date);
        }
    },
    {
        render: data => (
            <Row>
                <Tooltip title="Delete App">
                    <Button
                        type='primary'
                        shape='circle'
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(event) => {
                            event.stopPropagation()
                            onDelete(data)
                        }} />
                </Tooltip>
            </Row>
        )
    }
]


const { confirm } = Modal
const Dashboard = () => {
    const [loadingData, setLoadingData] = useState(false)
    const [apps, setApps] = useState([])
    const [isAddAppModalOpen, setAddAppModalOpen] = useState(false)
    const [loadingAddApp, setLoadingAddApp] = useState(false)
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const fetchData = useCallback(async () => {
        setLoadingData(true)
        const { response, err } = await network.get("_admin/apps")
        if (err) {
            notification.error({
                title: "Error",
                description: `Error while getting apps data, please contact the administrator. Message: ${err.message}`
            })
            setLoadingData(false)
            return
        }

        setApps(response.data)
        setLoadingData(false)
    }, [setApps])

    const onTableRowAction = ((row) => ({
        onClick: () => navigate(`/apps/${row.id}`)
    }))

    const onAddAppButtonClick = () => {
        form.resetFields()
        setAddAppModalOpen(true)
    }

    const onDeleteApp = app => {
        const deleteApp = async () => {
            const endpoint = `app?id=${app.id}`
            const {err} = await network.delete(endpoint)
            if (err) {
                notification.error({
                    title: "Error",
                    description: `Error while deleting app, please contact the administrator. Message: ${err.message}`
                })
                return
            }
            fetchData()
            notification.success({
                title: "Success",
                description: `App Deleted`
            })
        }
        confirm({
            title: 'Do you want to delete this App?',
            icon: <ExclamationCircleFilled />,
            content: 'Your action can not be undone',
            onOk() {
                deleteApp()
            },
        });

    }

    const onAddAppSubmit = async () => {
        try {
            await form.validateFields()
        } catch (err) {
            return
        }

        setLoadingAddApp(true)
        const payload = form.getFieldsValue()
        const { err } = await network.post("app", JSON.stringify(payload))
        if (err) {
            notification.error({
                title: "Error",
                description: `Error while creating the app, please contact the administrator. Message: ${err.message}`
            })
            setLoadingAddApp(false)
            return
        }

        notification.success({
            title: "Success",
            description: `App created successfully`
        })
        fetchData()
        setLoadingAddApp(false)
        setAddAppModalOpen(false)
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <>
            <Row justify="space-between">
                <Col><Typography.Title level={3}>Apps List</Typography.Title></Col>
                <Col>
                    <Button
                        type='primary'
                        onClick={onAddAppButtonClick}>
                        Add App
                    </Button>
                </Col>
            </Row>
            <Table
                loading={loadingData}
                onRow={onTableRowAction}
                className='apps-table'
                columns={getTableColumns({ onDelete: onDeleteApp })}
                dataSource={apps}
                rowKey="id" />
            <Modal
                title="Add a New App"
                open={isAddAppModalOpen}
                onOk={onAddAppSubmit}
                onCancel={() => setAddAppModalOpen(false)}
                confirmLoading={loadingAddApp}
                closable={false}>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label="App Name" name="app_name" rules={[{ required: true, message: "App Name is Required" }]}>
                        <Input placeholder='Example' />
                    </Form.Item>
                    <Form.Item label="Package Name" name="package_name" rules={[{ required: true, message: "Package Name is Required" }]}>
                        <Input placeholder="com.example.example" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Dashboard