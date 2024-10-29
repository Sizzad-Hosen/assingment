import express from 'express'
import { UsersController } from './users.controller';

const route = express.Router();

route.post("/create-users", UsersController.createUsers);

route.get("/",UsersController.getAllUsers);

route.get("/:usersId",UsersController.getIdUsers);

route.delete("/:usersId",UsersController.deletedUsers);

route.put("/:usersId",UsersController.updatedUsers);

route.put("/:usersId/orders",UsersController.updatedUsersOrders);



export const UsersRoute = route;
