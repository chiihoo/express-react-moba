const express = require('express')

const app = express()

// 设置一个全局的token密钥
app.set('secret', 'sfa5aa1qswe78va1f$sweq')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
require('express-async-errors') //这个包可以解决express无法全局捕获Promise异常的问题

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
