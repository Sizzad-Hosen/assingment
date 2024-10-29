import mongoose, { Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../app/config'
import TUsers, { UsersModel } from './users.interface'

// Define the User schema with TypeScript typings
const usersSchema: Schema<TUsers> = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// Pre-save hook to hash the password
usersSchema.pre('save', async function (this: Document & TUsers, next) {
  if (this.isModified('password')) {
    const saltRounds = Number(config.bcrpt_salt_rounds)
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  next()
})

// Post-save hook to clear password before sending the document
usersSchema.post('save', function (doc: Document & TUsers, next) {
  doc.password = ''
  next()
})

// Static method to check if user exists
usersSchema.statics.isUserExist = async function (userId: string) {
  return await Users.findOne({ userId })
}

// Create the User model
const Users = mongoose.model<TUsers, UsersModel>('User', usersSchema)
export default Users
