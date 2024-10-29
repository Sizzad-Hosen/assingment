import config from '../src/app/config'
import cors from 'cors'

import mongoose from 'mongoose'
import express from 'express'
import app from './app'

// Middleware
app.use(express.json())
app.use(cors())

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.db_url as string)
    console.log('Database connected successfully')

    // Start the Express server
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.error(
      'Error connecting to the database or starting the server:',
      error,
    )
  }
}

// Start the application
main()
