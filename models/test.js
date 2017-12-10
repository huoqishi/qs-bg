// const db = require('./db')
const User = require('./User')
User.findAll().then(users => {
  console.log(users)
})
