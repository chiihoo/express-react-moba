import React, { useState, useContext } from 'react'
import { Menu, Icon } from 'antd'
import './index.scss'
import { Link, useHistory } from 'react-router-dom'
import { HeaderNameContext } from '../../pages/Admin'

const { SubMenu } = Menu

function LeftNav() {
  const history = useHistory()
  const { setHeaderCurrentName } = useContext(HeaderNameContext)
  const handleClick = e => {
    //把key上传到Admin的index.js，再往下传到header组件
    setHeaderCurrentName(e.keyPath[1])
  }

  const rootSubmenuKeys = ['内容管理', '系统设置']
  const [openKeysState, setOpenKeysState] = useState(['内容管理'])
  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => openKeysState.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeysState(openKeys)
    } else {
      setOpenKeysState(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <div className="LeftNav">
      <div className="logo">logo</div>
      <Menu
        onClick={handleClick}
        selectedKeys={[history.location.pathname]}
        defaultOpenKeys={['内容管理']}
        defaultSelectedKeys={['']}
        openKeys={openKeysState}
        onOpenChange={onOpenChange}
        mode="inline"
        style={{
          height: 'calc(100% - 64px)'
        }}
      >
        <SubMenu
          key="内容管理"
          title={
            <span>
              <Icon type="edit" />
              <span>内容管理</span>
            </span>
          }
        >
          <Menu.ItemGroup key="categories" title="分类">
            <Menu.Item key="/admin/categories/create">
              <Link to="/admin/categories/create">新建分类</Link>
            </Menu.Item>
            <Menu.Item key="/admin/categories/list">
              <Link to="/admin/categories/list">分类列表</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="items" title="物品">
            <Menu.Item key="/admin/items/create">
              <Link to="/admin/items/create">新建物品</Link>
            </Menu.Item>
            <Menu.Item key="/admin/items/list">
              <Link to="/admin/items/list">物品列表</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="heroes" title="英雄">
            <Menu.Item key="/admin/heroes/create">
              <Link to="/admin/heroes/create">新建英雄</Link>
            </Menu.Item>
            <Menu.Item key="/admin/heroes/list">
              <Link to="/admin/heroes/list">英雄列表</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="系统设置"
          title={
            <span>
              <Icon type="appstore" />
              <span>系统设置</span>
            </span>
          }
        >
          <Menu.ItemGroup key="admin_users" title="管理员">
            <Menu.Item key="/admin/admin_users/create">
              <Link to="/admin/admin_users/create">新建管理员</Link>
            </Menu.Item>
            <Menu.Item key="/admin/admin_users/list">
              <Link to="/admin/admin_users/list">管理员列表</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default LeftNav
