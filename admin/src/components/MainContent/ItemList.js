import React, { useState, useEffect } from 'react'
import { Table, Divider, PageHeader, message, Modal, Spin } from 'antd'
import http from '../../http'
import { Link, useHistory } from 'react-router-dom'

function ItemList(props) {
  const history = useHistory()
  const [dataSource, setDataSource] = useState([])
  const [updateAction, setUpdateAction] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {
      const items = await http.get('/rest/items')
      const data = items.data.map((item, idx, arr) => {
        return { key: item._id, id: item._id, name: item.name, icon: item.icon }
      })
      setDataSource(data)
    }
    fetchItems()
  }, [updateAction])

  // 使用updateAction这个额外变量，是为了刷新页面，重新获取数据
  const removeItem = async data => {
    const { confirm } = Modal
    confirm({
      title: `确定要删除物品 “${data.name}”？`,
      content: '此操作不可逆！',
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        const res = await http.delete(`/rest/items/${data.id}`)
        message.success('删除成功')
        setUpdateAction(!updateAction)
      },
      onCancel() {}
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 300
    },
    {
      title: '物品名称',
      dataIndex: 'name',
      key: 'name',
      width: 300
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',

      render: text => (text ? <img src={text} style={{ width: 80 }}></img> : '')
    },
    {
      title: '操作',
      key: 'action',
      width: 200,

      render: (text, record) => {
        return (
          <span>
            <Link to={`/admin/items/edit/${record.id}`}>编辑</Link>
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
    <div className="ItemList">
      <PageHeader onBack={() => history.goBack()} title="物品列表"></PageHeader>
      <Spin spinning={false}></Spin>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
      />
    </div>
  )
}

export default ItemList
