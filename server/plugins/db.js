module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/express-react-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

  
}
