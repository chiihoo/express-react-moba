import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, PageHeader } from 'antd'
import http from '../../http'
import { useHistory, useParams } from 'react-router-dom'

function AdminUserEdit(props) {
  const history = useHistory()
  const { id } = useParams()
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = props.form
  // 编辑管理员 获取当前id所代表的数据
  const [currentUsername, setCurrentUsername] = useState()
  const [currentPassword, setCurrentPassword] = useState()

  // 保存后需要更新数据
  // const [updateAction, setUpdateAction] = useState(false)

  // 如果有id，说明是编辑管理员，获取当前id所代表的数据，有username和password
  // 如果没有id，说明是新建管理员，就把当前值全部清空
  useEffect(() => {
    if (id) {
      ;(async function fetchCurrentValue() {
        const res = await http.get(`/rest/admin_users/${id}`)
        setCurrentUsername(res.data.username)
        setCurrentPassword(res.data.password)
      })()
    } else {
      setCurrentUsername('')
      setCurrentPassword('')
    }
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()

    // 触发表单验证
    props.form
      .validateFields()
      .then(async values => {
        if (id) {
          // 编辑管理员
          const res = await http.put(`/rest/admin_users/${id}`, values)
          message.success('编辑成功')
          history.push('/admin/admin_users/list')
        } else {
          // 新建管理员
          const res = await http.post('/rest/admin_users', values)
          message.success('保存成功')
          // 操作完成后，把表单选项还原
          setFieldsValue({ username: '', password: '' })
        }
      })
      .catch(errorInfo => {})
  }

  return (
    <div className="AdminUserEdit">
      <PageHeader
        onBack={() => history.goBack()}
        title={id ? '编辑管理员' : '新建管理员'}
      ></PageHeader>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="账户" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请填写管理员名称!' }],
            initialValue: currentUsername || ''
          })(<Input placeholder="" />)}
        </Form.Item>
        <Form.Item label="密码" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请填写管理员密码!' }],
            initialValue: currentPassword || ''
          })(<Input type="password" placeholder="" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

// 使用 Form.create 处理后的表单具有自动收集数据并校验的功能
const WrappedAdminUserEdit = Form.create()(AdminUserEdit)
export default WrappedAdminUserEdit
