import { z } from 'zod'

const addressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
})

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
})

const usersValidationSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required' }),
  userName: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be 20 characters or less' }),

  fullName: fullNameValidationSchema,

  age: z.number().int().positive({ message: 'Age must be a positive integer' }),

  email: z.string().email({ message: 'Email must be a valid email address' }),

  isActive: z.boolean().default(true),

  hobbies: z
    .array(z.string().min(1, { message: 'Hobby cannot be empty' }))
    .nonempty({ message: 'At least one hobby is required' }),

  address: addressValidationSchema,

  isDeleted: z.boolean().optional().default(false),
})

export { usersValidationSchema }
export type User = z.infer<typeof usersValidationSchema>
