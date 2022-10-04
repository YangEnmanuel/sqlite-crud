import jwt from 'jsonwebtoken'

const data = {
  id: 1,
  name: 'Yang',
}

const secret = '123'

const token = jwt.sign(data, secret)
console.log(token)

const res = jwt.verify(token, secret)
console.log(res)
