const jwt = require('jsonwebtoken')
jwt.sign({name: 18, age: 8}, 'secrets', {expiresIn: '1h'}, (err, token) => {
  if (err) return console.log(err)
  console.log(token)
  console.log('=======')
  jwt.verify(token, 'secretss', (err, decode) => {
    if (err) console.log(err)
    console.log('ok')
    console.log(decode)
    // console.
  })
})
