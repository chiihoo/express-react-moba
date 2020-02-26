import React, { useContext } from 'react'
import { HeaderNameContext } from '../../pages/Admin'
import { PageHeader } from 'antd'

function HeaderName(props) {
  const { headerCurrentName } = useContext(HeaderNameContext)
  return (
    <>
      <PageHeader title={headerCurrentName}></PageHeader>
    </>
  )
}
export default HeaderName
