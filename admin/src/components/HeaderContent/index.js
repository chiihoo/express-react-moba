import React from 'react'
import { Row, Col } from 'antd'
import HeaderName from './HeaderName'

function HeaderContent(props) {
  return (
    <div className="HeaderContent">
      <Row>
        <Col span={21}>
          <HeaderName />
        </Col>
        <Col span={3}>登录 注册</Col>
      </Row>
    </div>
  )
}
export default HeaderContent
