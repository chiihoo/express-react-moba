import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, PageHeader, Select } from 'antd'
import http from '../../http'
import { useHistory, useParams } from 'react-router-dom'

const { Option } = Select

function CategoryEdit(props) {
  const history = useHistory()
  const { id } = useParams()
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = props.form
  // 编辑分类 获取当前id所代表的数据
  const [currentName, setCurrentName] = useState()
  const [currentParent, setCurrentParent] = useState()

  // 获取所有分类，用于填充'上级分类' 所有options
  const [allCategories, setAllCategories] = useState([])
  // 保存后需要更新数据
  const [updateAction, setUpdateAction] = useState(false)

  // 异步操作必须要用setState来拿数据，因为setState也是异步的
  // 像网络请求这类操作要放到useEffect中，而不是useMemo

  // 如果有id，说明是编辑分类，获取当前id所代表的数据，有name和parent(为_id值)
  // 如果没有id，说明是新建分类，就把当前值全部清空
  useEffect(() => {
    if (id) {
      ;(async function fetchCurrentValue() {
        const res = await http.get(`/rest/categories/${id}`)
        setCurrentName(res.data.name)
        setCurrentParent(res.data.parent)
      })()
    } else {
      // 若从编辑分类点击到新建分类，id变化了，需要将name和parent清空
      // 由于parent是写在Select中，需要跟Option的value作比较，所以要写成undefined
      setCurrentName('')
      setCurrentParent()
    }
  }, [id])

  // 获取所有分类
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await http.get('/rest/categories')
      setAllCategories(res.data)
    }
    fetchAllCategories()
  }, [updateAction])

  const handleSubmit = async e => {
    e.preventDefault()
    // const values = getFieldsValue()
    // values包含表单提交的所有数据，包括name和parent，不能改名字
    // 因为这里提交的是values，后台数据库建的model也是{name,parent}，后台是直接用req.body来自动处理的

    // 触发表单验证
    props.form
      .validateFields()
      .then(async values => {
        if (id) {
          // 编辑分类
          const res = await http.put(`/rest/categories/${id}`, values)
          message.success('编辑成功')
          history.push('/admin/categories/list')
        } else {
          // 新建分类
          // await http.post('/rest/categories', values)
          const res = await http.post('/rest/categories', values)
          message.success('保存成功')
          // 操作完成后，把表单选项还原
          setFieldsValue({ parent: undefined, name: '' })
          // 切换更新状态，使得 获取所有分类 fetchAllCategories方法 再次运行
          setUpdateAction(!updateAction)
        }
      })
      .catch(errorInfo => {})
  }

  return (
    <div className="categoryEdit">
      <PageHeader onBack={() => history.goBack()} title={id ? '编辑分类' : '新建分类'}></PageHeader>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="上级分类" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('parent', {
            initialValue: currentParent
          })(
            <Select placeholder="请选择" style={{ width: 200, float: 'left' }}>
              {allCategories.map(item => (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请填写分类名称!' }],
            // 设置编辑分类和新建分类页面，input框的默认值
            // initialValue: id ? currentName : ''
            initialValue: currentName || ''
          })(<Input placeholder="" />)}
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
const WrappedCategoryEdit = Form.create()(CategoryEdit)
export default WrappedCategoryEdit
