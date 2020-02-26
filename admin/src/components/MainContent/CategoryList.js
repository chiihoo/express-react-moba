import React, { useState, useEffect } from 'react'
import { Table, Divider, PageHeader, message, Modal, Spin } from 'antd'
import http from '../../http'
import { Link, useHistory } from 'react-router-dom'

function CategoryList(props) {
  const history = useHistory()
  const [dataSource, setDataSource] = useState([])
  const [updateAction, setUpdateAction] = useState(false)

  // 里面这段代码必须放在useEffect中，必须加第二个参数，且不能是dataSource。
  // 否则会无限循环，访问接口获取数据，存到dataSource，dataSource又改变dom，导致重新渲染，又会重新访问接口...
  useEffect(() => {
    const fetchItems = async () => {
      const items = await http.get('/rest/categories')
      // 这里接口中.find().populate('parent')查到的parent字段为所属_id代表的对象
      const data = items.data.map((item, idx, arr) => {
        return item.parent
          ? { key: item._id, id: item._id, name: item.name, parent: item.parent.name }
          : { key: item._id, id: item._id, name: item.name }
      })
      setDataSource(data)
    }
    fetchItems()
  }, [updateAction])

  // 使用updateAction这个额外变量，是为了刷新页面，重新获取数据
  const removeItem = async data => {
    const { confirm } = Modal
    confirm({
      title: `确定要删除分类 “${data.name}”？`,
      content: '此操作不可逆！',
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        const res = await http.delete(`/rest/categories/${data.id}`)
        message.success('删除成功')
        setUpdateAction(!updateAction)
      },
      onCancel() {}
    })
  }
  // const dataSource = [
  //   {
  //     key: '1',
  //     id: 'id1',
  //     name: 'name1'
  //   },
  //   {
  //     key: '2',
  //     id: 'id2',
  //     name: 'name2'
  //   }
  // ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 300
    },
    {
      title: '上级分类',
      dataIndex: 'parent',
      key: 'parent',
      width: 300
    },
    {
      title: '分类',
      dataIndex: 'name',
      key: 'name',
      width: 300
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record) => {
        return (
          <span>
            <Link to={`/admin/categories/edit/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <a
              onClick={() => {
                removeItem(record)
              }}
            >
              删除
            </a>
          </span>
        )
      }
    }
  ]

  return (
    <div className="CategoryList">
      <PageHeader onBack={() => history.goBack()} title="分类列表"></PageHeader>
      <Spin spinning={false}></Spin>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
      />
    </div>
  )
}

export default CategoryList
