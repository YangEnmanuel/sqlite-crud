// Server's routes
import { Router } from 'express'

import { getUserByID, getUsers, welcomeUser } from '../handlers/minorActions.js'
import addUser from '../handlers/addUser.js'
import deleteUser from '../handlers/deleteUser.js'
import updateUser from '../handlers/updateUser.js'
import loginUser from '../auth/loginUser.js'

export const router = Router()

router.get('/', welcomeUser)

router.get('/users', getUsers)

router.get('/users/:id', getUserByID)

router.post('/register', addUser)

router.delete('/users/:id', deleteUser)

router.put('/users/:id', updateUser)

router.get('/login', loginUser)
