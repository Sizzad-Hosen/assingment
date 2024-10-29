import { Model } from 'mongoose'

interface TUsers {
  userId: string
  userName: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[] // Array of strings
  address: {
    street: string
    city: string
    country: string
  }
  isDeleted: boolean
  // orders: {
  //     productName: string;
  //     price: number;
  //     quantity: number;
  // }[]; // Array of order objects
}

export default TUsers

// for creating static

export interface UsersModel extends Model<TUsers> {
  isUserExist(id: string): Promise<TUsers | null>
}
