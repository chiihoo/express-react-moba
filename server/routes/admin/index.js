module.exports = app => {
  const express = require('express')
  const router = express.Router({
    // 父级路由合并到子级路由，使子路由能访问到父路由的params
    mergeParams: true
  })

  // 新建分类 新建一个分类
  router.post('', async (req, res) => {
    const model = await req.Model.create(req.body)
    // const model = await req.Model.create({ name: req.body.name })
    res.send(model)
  })
  // 分类列表 获取现有分类
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)

    // 这样查询，parent字段为上级分类_id的对象
    // const items = await req.Model.find().populate('parent')
    // 这样查询，parent字段为上级分类的_id
    // const items = await req.Model.find()
    res.send(items)
  })
  // 分类列表 删除分类
  router.delete('/:id', async (req, res) => {
    const items = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({ success: true })
  })
  // 编辑分类 获取当前分类名
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 编辑分类 修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //通用接口
  app.use(
    '/admin/api/rest/:resource',
    async (req, res, next) => {
      // 中间件，req.params.resource是小写复数形式的，inflection包能把它转换成首字母大写的单数形式，
      // 这也是Model的命名规范，之后就能从models文件夹中拿到Model了
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )

  // 上传图标  multer是解析 上传文件信息 的中间件，可以设置上传到的文件夹
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // 不是一个路径
  // const upload = multer({ dest: __dirname + '/uploads' })

  // upload.single('file1')，这个file1是antd中Upload组件的name属性
  app.post('/admin/api/upload', upload.single('icon-file'), async (req, res) => {
    const file = req.file
    console.log(file)
    file.url = `http://localhost:3001/uploads/${file.filename}`
    res.send(file)
  })
}
