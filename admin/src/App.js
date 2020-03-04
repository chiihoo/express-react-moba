import React from 'react'
import './App.css'
import { Router, BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import history from './history'
import AuthRoute from './routes/AuthRoute'

function App() {
  return (
    <div className="App">
      {/* 如果要在拦截器那使用路由，这里只能用Router，不能用BrowserRouter。
        BrowserRouter = Router + Browserhistory，
        如果拦截器那使用createBrowserHistory()创建history的话，相当于创建了一个新的history对象，无法实现跳转

        <BrowserRouter></BrowserRouter>
        等价于 
        import {createBrowserHistory} from 'history' 
        const history = createBrowserHistory()
        <Router history={history}></Router>
        可以把history抽离出来，这样就都使用的同一个history对象
       */}
      <Router history={history}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <AuthRoute path="/admin">
            <Admin />
          </AuthRoute>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
