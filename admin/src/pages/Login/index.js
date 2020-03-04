import React from 'react'
import { Card, Form, Icon, Input, Button, Checkbox, message } from 'antd'
import './index.scss'
import http from '../../http'
import { useHistory, useParams } from 'react-router-dom'

function Login(props) {
  const { getFieldDecorator } = props.form
  const history = useHistory()
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields().then(async values => {
      const res = await http.post('/login', values)
      localStorage.token = res.data.token
      history.push('/admin')
      message.success('登陆成功')
    })
  }

  return (
    <div>
      <Card title="请登录" style={{ width: 380 }} className="login-card">
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>记住用户名</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码？
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            或 <a href="">注册</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

const WrappedLogin = Form.create()(Login)

export default WrappedLogin
