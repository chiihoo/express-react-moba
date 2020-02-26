import React, { useContext } from 'react'
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
  return (
    <div className="LeftNav">
      <div className="logo">logo</div>
      <Menu
        onClick={handleClick}
        selectedKeys={[history.location.pathname]}
        defaultOpenKeys={['内容管理']}
        defaultSelectedKeys={['']}
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
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default LeftNav
