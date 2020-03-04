module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
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

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  //通用接口
  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
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
  app.post('/admin/api/upload', authMiddleware(), upload.single('icon-file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3001/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 根据用户名找到用户
    const user = await AdminUser.findOne({ username }).select('+password')
    // const user = await (await AdminUser.findOne({ username }))
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({ message: '用户不存在' })
    // }
    // 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({ message: '密码错误' })
    // }
    // 返回token
    // 第二个参数为全局的token密钥
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // assert是直接抛出错误，需要有个错误处理中间件
  // express-async-errors 这个包可以解决express无法全局捕获Promise异常的问题
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message })
  })
}
