import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// 登录拦截
function AuthRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return localStorage.token ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }}></Redirect>
        )
      }}
    />
  )
}

export default AuthRoute