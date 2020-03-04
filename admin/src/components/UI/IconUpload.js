import React from 'react'
import { Upload, Icon, message } from 'antd'
import './IconUpload.scss'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

class IconUpload extends React.Component {
  state = {
    loading: false
  }

  handleChange = info => {
    console.log('info', info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      )

      // 传进来的自定义handleResponse方法，把返回的图片后台地址，保存到上层组件的state中
      this.props.handleResponse(info)
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    // const { imageUrl } = this.state
    return (
      <Upload
        name="icon-file"
        listType="picture-card"
        className="icon-uploader"
        showUploadList={false}
        action={this.props.action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        headers={{ authorization: `Bearea  ${localStorage.token || ''}` }}
      >
        {/* antd是直接把二进制或base64填入src */}
        {/* {imageUrl ? <img src={imageUrl} alt="icon" style={{ width: '100%' }} /> : uploadButton} */}

        {/* 需要在编辑页面也可以看到图片，就使用后端返回来的图片url */}
        {this.props.currentImgUrl ? (
          <img src={this.props.currentImgUrl} alt="icon" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }
}

export default IconUpload
