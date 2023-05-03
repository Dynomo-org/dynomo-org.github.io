import { useState, useEffect, useCallback } from 'react';
import { Layout, Typography, Table, notification, Row, Col, Button, Modal, Form, Input } from 'antd';
import './index.css'
import network from './utlis/network';

const tableColumns = [
  {
    title: "Name",
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
  }
]


const { Content, Footer } = Layout
const HomePage = () => {
  const [alert, alertContext] = notification.useNotification()
  const [apps, setApps] = useState([])
  const [isAddAppModalOpen, setAddAppModalOpen] = useState(false)
  const [loadingAddApp, setLoadingAddApp] = useState(false)
  const [form] = Form.useForm();

  const fetchData = useCallback(async () => {
    const { response, err } = await network.get("_admin/apps")
    if (err) {
      alert.error({
        title: "Error",
        description: `Error while getting apps data, please contact the administrator. Message: ${err.message}`
      })
      return
    }

    setApps(response.data)
  }, [alert, setApps])

  const onTableRowAction = ((row) => ({
    onClick: () => console.log(row.id)
  }))

  const onAddAppButtonClick = () => {
    form.resetFields()
    setAddAppModalOpen(true)
  }

  const onAddAppSubmit = async () => {
    try {
      await form.validateFields()
    } catch (err) { }

    setLoadingAddApp(true)
    const payload = form.getFieldsValue()
    const { err } = await network.post("app", payload)
    if (err) {
      alert.error({
        title: "Error",
        description: `Error while creating the app, please contact the administrator. Message: ${err.message}`
      })
      setLoadingAddApp(false)
      return
    }

    alert.success({
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
      {alertContext}
      <Layout className='main'>
        <Layout>
          <Content className='content'>
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
              onRow={onTableRowAction}
              className='apps-table'
              columns={tableColumns}
              dataSource={apps}
              rowKey="id" />
          </Content>
          <Footer className='footer'>
            Dynapgen @ 2023. Made with ❤️
          </Footer>
        </Layout>
      </Layout>
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

export default HomePage
export const Head = () => {
  return (
    <title>Home Page</title>
  )
}