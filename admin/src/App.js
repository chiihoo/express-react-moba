import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Admin />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
