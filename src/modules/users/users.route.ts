import express from 'express'
import { UsersController } from './users.controller'

const router = express.Router()

router.post('/create-users', UsersController.createUsers)

router.get('/', UsersController.getAllUsers)

router.get('/:usersId', UsersController.getIdUsers)

router.delete('/:usersId', UsersController.deletedUsers)

router.put('/:usersId', UsersController.updatedUsers)

router.put('/:usersId/orders', UsersController.updatedUsersOrders)

export const UsersRouter = router;

