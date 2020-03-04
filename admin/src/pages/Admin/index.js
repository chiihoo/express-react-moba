import React, { useState } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import HeaderContent from '../../components/HeaderContent'
import LeftNav from '../../components/LeftNav'
import CategoryEdit from '../../components/MainContent/CategoryEdit'
import CategoryList from '../../components/MainContent/CategoryList'
import ItemEdit from '../../components/MainContent/ItemEdit'
import ItemList from '../../components/MainContent/ItemList'
import HeroEdit from '../../components/MainContent/HeroEdit'
import HeroList from '../../components/MainContent/HeroList'
import AdminUserEdit from '../../components/MainContent/AdminUserEdit'
import AdminUserList from '../../components/MainContent/AdminUserList'

const { Header, Footer, Sider, Content } = Layout

export const HeaderNameContext = React.createContext()

function Admin() {
  // 把LeftNav当前选中目录的名字往上提升到上层Admin组件，再往下传到下层HeaderContent组件
  const [headerCurrentName, setHeaderCurrentName] = useState('后台管理')
  const HeaderNameContextObj = {
    headerCurrentName,
    setHeaderCurrentName
  }
  return (
    <HeaderNameContext.Provider value={HeaderNameContextObj}>
      <Layout
      // style={{ height: '100vh' }}
      >
        <Sider
          theme={'light'}
          width={256}
          style={{
            background: 'fff',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
          }}
        >
          <LeftNav />
        </Sider>
        <Layout style={{ marginLeft: 256 }}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeaderContent />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff' }}>
              <Switch>
                <Route path="/admin/categories/create">
                  <CategoryEdit />
                </Route>
                <Route path="/admin/categories/edit/:id">
                  <CategoryEdit />
                </Route>
                <Route path="/admin/categories/list">
                  <CategoryList />
                </Route>
                <Route path="/admin/items/create">
                  <ItemEdit />
                </Route>
                <Route path="/admin/items/edit/:id">
                  <ItemEdit />
                </Route>
                <Route path="/admin/items/list">
                  <ItemList />
                </Route>
                <Route path="/admin/heroes/create">
                  <HeroEdit />
                </Route>
                <Route path="/admin/heroes/edit/:id">
                  <HeroEdit />
                </Route>
                <Route path="/admin/heroes/list">
                  <HeroList />
                </Route>
                <Route path="/admin/admin_users/create">
                  <AdminUserEdit />
                </Route>
                <Route path="/admin/admin_users/edit/:id">
                  <AdminUserEdit />
                </Route>
                <Route path="/admin/admin_users/list">
                  <AdminUserList />
                </Route>

                <Route path="/admin">
                  <br />
                  Really
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  ...
                  <br />
                  long
                  <br />
                  ...
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </HeaderNameContext.Provider>
  )
}

export default Admin
