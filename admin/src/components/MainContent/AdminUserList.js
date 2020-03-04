import React, { useState, useEffect } from 'react'
import { Table, Divider, PageHeader, message, Modal, Spin } from 'antd'
import http from '../../http'
import { Link, useHistory } from 'react-router-dom'

function AdminUserList(props) {
  const history = useHistory()
  const [dataSource, setDataSource] = useState([])
  const [updateAction, setUpdateAction] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      const items = await http.get('/rest/admin_users')
      const data = items.data.map((item, idx, arr) => {
        return {
          key: item._id,
          id: item._id,
          username: item.username,
        }
      })
      setDataSource(data)
      setLoading(false)
    }
    fetchItems()
  }, [updateAction])

  // 使用updateAction这个额外变量，是为了刷新页面，重新获取数据
  const removeItem = async data => {
    const { confirm } = Modal
    confirm({
      title: `确定要删除用户 “${data.name}”？`,
      content: '此操作不可逆！',
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        const res = await http.delete(`/rest/admin_users/${data.id}`)
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
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 300
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record) => {
        return (
          <span>
            <Link to={`/admin/admin_users/edit/${record.id}`}>编辑</Link>
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
    <div className="AdminUserList">
      <PageHeader onBack={() => history.goBack()} title="用户名列表"></PageHeader>
      <Spin spinning={false}></Spin>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
        loading={loading}
      />
    </div>
  )
}

export default AdminUserList
