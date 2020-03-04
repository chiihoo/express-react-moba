import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, PageHeader, Select, Rate } from 'antd'
import http from '../../http'
import { useHistory, useParams } from 'react-router-dom'
import IconUpload from '../UI/IconUpload'

const { Option } = Select

function HeroEdit(props) {
  const history = useHistory()
  const { id } = useParams()
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = props.form

  const [currentName, setCurrentName] = useState()
  const [currentTitle, setCurrentTitle] = useState()
  const [currentCategories, setCurrentCategories] = useState([])
  const [currentScores, setCurrentScores] = useState({})
  const [currentIcon, setCurrentIcon] = useState()

  // 获取所有分类
  const [allCategories, setAllCategories] = useState([])

  // 保存后需要更新数据
  //  const [updateAction, setUpdateAction] = useState(false)

  useEffect(() => {
    if (id) {
      ;(async function fetchCurrentValue() {
        const res = await http.get(`/rest/heroes/${id}`)
        setCurrentName(res.data.name)
        setCurrentTitle(res.data.title)
        setCurrentCategories(res.data.categories)
        setCurrentScores(res.data.scores)
        setCurrentIcon(res.data.icon)
      })()
    } else {
      // setEditCurrentValue({ parent: undefined, name: '' })
      setCurrentName('')
      setCurrentTitle('')
      setCurrentCategories([])
      setCurrentScores({ difficult: 0, skills: 0, attack: 0, survive: 0 })
      setCurrentIcon()
    }
  }, [id])

  // 获取所有分类
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await http.get('/rest/categories')
      setAllCategories(res.data)
    }
    fetchAllCategories()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    // const values = getFieldsValue()
    // values包含表单提交的所有数据，包括name和icon，不能改名字
    // 因为这里提交的是values，后台数据库建的model也是{name,icon}，后台是直接用req.body来自动处理的

    // props.form.validateFields(async (error, values) => {
    //   if (!error) {
    //     //提交表单
    //   }
    // })

    // 触发表单验证
    props.form
      .validateFields()
      .then(async values => {
        if (id) {
          // 编辑英雄
          const res = await http.put(`/rest/heroes/${id}`, values)
          message.success('编辑成功')
          history.push('/admin/heroes/list')
        } else {
          // 新建英雄
          const res = await http.post('/rest/heroes', values)
          message.success('保存成功')
          // 保存成功后 将所有选项清空
          setFieldsValue({
            name: '',
            title: '',
            categories: []
          })
          setCurrentIcon()
          setCurrentScores({ difficult: 0, skills: 0, attack: 0, survive: 0 })
        }
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  return (
    <div className="ItemEdit">
      <PageHeader onBack={() => history.goBack()} title={id ? '编辑英雄' : '新建英雄'}></PageHeader>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '请填写英雄名称!' },
              { max: 5, message: '最多5位!' }
            ],
            initialValue: currentName || ''
          })(<Input placeholder="" />)}
        </Form.Item>

        <Form.Item label="称号" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请填写英雄称号!' }],
            initialValue: currentTitle || ''
          })(<Input placeholder="" />)}
        </Form.Item>

        <Form.Item label="类型" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('categories', {
            rules: [{ required: true, message: '请填写英雄类型!' }],
            initialValue: currentCategories || ''
          })(
            <Select mode="multiple" placeholder="请选择" style={{ width: 500 }}>
              {allCategories.map(item => (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="难度" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('scores.difficult', {
            // initialValue: currentScores.difficult
          })(
            <div style={{ float: 'left' }}>
              <Rate
                tooltips={['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分']}
                onChange={val => setCurrentScores({ ...currentScores, difficult: val })}
                value={currentScores.difficult}
                count={10}
              />
              {currentScores.difficult ? (
                <span style={{ paddingLeft: 10 }}>{currentScores.difficult}分</span>
              ) : (
                ''
              )}
            </div>
          )}
        </Form.Item>
        <Form.Item label="技能" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('scores.skills', {
            // initialValue: currentScores.skills
          })(
            <div style={{ float: 'left' }}>
              <Rate
                tooltips={['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分']}
                onChange={val => setCurrentScores({ ...currentScores, skills: val })}
                value={currentScores.skills}
                count={10}
              />
              {currentScores.skills ? (
                <span style={{ paddingLeft: 10 }}>{currentScores.skills}分</span>
              ) : (
                ''
              )}
            </div>
          )}
        </Form.Item>
        <Form.Item label="攻击" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('scores.attack', {
            // initialValue: currentScores.attack
          })(
            <div style={{ float: 'left' }}>
              <Rate
                tooltips={['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分']}
                onChange={val => setCurrentScores({ ...currentScores, attack: val })}
                value={currentScores.attack}
                count={10}
              />
              {currentScores.attack ? (
                <span style={{ paddingLeft: 10 }}>{currentScores.attack}分</span>
              ) : (
                ''
              )}
            </div>
          )}
        </Form.Item>
        <Form.Item label="生存" labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          {getFieldDecorator('scores.survive', {
            // initialValue: currentScores.survive
          })(
            <div style={{ float: 'left' }}>
              <Rate
                tooltips={['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分']}
                onChange={val => setCurrentScores({ ...currentScores, survive: val })}
                value={currentScores.survive}
                count={10}
              />
              {currentScores.survive ? (
                <span style={{ paddingLeft: 10 }}>{currentScores.survive}分</span>
              ) : (
                ''
              )}
            </div>
          )}
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

const WrappedHeroEdit = Form.create()(HeroEdit)
export default WrappedHeroEdit
