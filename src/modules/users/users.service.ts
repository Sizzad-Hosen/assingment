import TUsers from './users.interface'
import Users from './users.model'



const createUsersInToDB = async (usersData: TUsers) => {

    if(await Users.isUserExist(usersData.userId))
    {
        throw new Error("user already exist");
    }
  const result = await Users.create(usersData)
  return result
}

const getAllUsersInToDB = async (usersData: TUsers) => {
  const result = await Users.find(usersData)
  return result
}
const getIdUsersInToDB = async (id: string) => {
  const result = await Users.findOne({ id })

  return result
}

const deletedUsersToDB = async (id: string) => {
  const result = await Users.updateOne({ id }, { isDeleted: true })
}


const updatedUsersToDB = async (id: string, updateData: TUsers) => {
  const result = await Users.findOneAndUpdate({ id }, updateData, { new: true })
}
const updatedUsersOrdersToDB = async (id: string, updateData: TUsers) => {
  const result = await Users.findOneAndUpdate({ id }, updateData, { new: true })
}


export const UsersService = {
  createUsersInToDB,
  getAllUsersInToDB,
  getIdUsersInToDB,
  deletedUsersToDB,
  updatedUsersToDB,
  updatedUsersOrdersToDB
}
