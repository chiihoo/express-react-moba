import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, PageHeader } from 'antd'
import http from '../../http'
import { useHistory, useParams } from 'react-router-dom'
import IconUpload from '../UI/IconUpload'

function ItemEdit(props) {
  const history = useHistory()
  const { id } = useParams()
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = props.form

  // 获取当前id所代表的数据，之所以不分开写，是考虑到复用问题
  // const [editCurrentValue, setEditCurrentValue] = useState({})
  const [currentName, setCurrentName] = useState()
  const [currentIcon, setCurrentIcon] = useState()

  //  // 保存后需要更新数据
  //  const [updateAction, setUpdateAction] = useState(false)

  useEffect(() => {
    if (id) {
      ;(async function fetchCurrentValue() {
        const res = await http.get(`/rest/item/${id}`)
        setCurrentName(res.data.name)
        setCurrentIcon(res.data.icon)
      })()
    } else {
      // setEditCurrentValue({ parent: undefined, name: '' })
      setCurrentName('')
      // setCurrentIcon()
    }
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()
    const values = getFieldsValue()
    console.log(values)
    // values包含表单提交的所有数据，包括name和icon，不能改名字
    // 因为这里提交的是values，后台数据库建的model也是{name,icon}，后台是直接用req.body来自动处理的
    if (!values.name) {
      message.error('分类不能为空！')
      return
    }
    if (id) {
      // 编辑分类
      const res = await http.put(`/rest/items/${id}`, values)
      message.success('编辑成功')
      history.push('/admin/items/list')
    } else {
      // 新建分类
      const res = await http.post('/rest/items', values)
      message.success('保存成功')
      setFieldsValue({ name: ''})
      setCurrentIcon()

      // setUpdateAction(!updateAction)
    }
  }

  return (
    <div className="ItemEdit">
      <PageHeader onBack={() => history.goBack()} title={id ? '编辑物品' : '新建物品'}></PageHeader>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请填写物品名称!' }],
            // initialValue: id ? currentName : ''
            initialValue: currentName || ''
          })(<Input placeholder="" />)}
        </Form.Item>
        <Form.Item label="图标" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('icon', {
            initialValue: currentIcon || ''
          })(
            <IconUpload
              action={http.defaults.baseURL + '/upload'}
              handleResponse={info => setCurrentIcon(info.file.response.url)}
              currentImgUrl={currentIcon}
            />
          )}
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

const WrappedItemEdit = Form.create()(ItemEdit)
export default WrappedItemEdit
