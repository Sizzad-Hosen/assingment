import { Request, Response } from 'express'
import { UsersService } from './users.service'
import { usersValidationSchema } from './users.validation';
import { z } from 'zod';




const createUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { users: usersData } = req.body;

    if (!usersData) {
      return res.status(400).json({
        success: false,
        message: "Missing 'users' in request body",
      });
    }

    const validatedData = usersValidationSchema.parse(usersData);
    const result = await UsersService.createUsersInToDB(validatedData);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Check for Zod validation error
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      });
    }

    // Type-cast error to `any` to access `message` property
    const errorMessage = (error as any).message || 'An unexpected error occurred';
    
    return res.status(500).json({
      success: false,
      message: errorMessage,
      error,  // Including the full error for debugging
    });
  }
};

      
const getAllUsers = async(req:Request, res:Response)=>{

    try {

        const result = await UsersService.getAllUsersInToDB();
    
        res.status(201).json({
          success: true,
          message: 'Users get successfully',
          data: result,
        });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: error.message || 'Something went wrong',
          error: error,
        });
      }
}
      
const getIdUsers = async(req:Request, res:Response)=>{

    try {
        const {usersId} = req.params;


        const result = await UsersService.getIdUsersInToDB(usersId);
    
        res.status(200).json({
          success: true,
          message: 'Users get successfully',
          data: result,
        });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: error.message || 'Something went wrong',
          error: error,
        });
      }
}
const deletedUsers = async(req:Request, res:Response)=>{

    try {
        const {usersId} = req.params;


        const result = await UsersService.deletedUsersToDB(usersId);
    
        res.status(200).json({
          success: true,
          message: 'Users deleted successfully',
          data: result,
        });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: error.message || 'Something went wrong',
          error: error,
        });
      }
}



const updatedUsers =async(req: Request, res: Response)=> {
      try {
        const { userId } = req.params;
        const updateData = req.body;
  
        const updatedUser = await UsersService.updatedUsersToDB(userId, updateData);
  
    
        res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: updatedUser,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          
          error: error,
        });
      }
    }
  

const updatedUsersOrders =async(req: Request, res: Response)=> {
      try {
        const { userId } = req.params;
        const updateOrdersData = req.body;
  
        const updatedUser = await UsersService.updatedUsersOrdersToDB(userId, updateOrdersData);
  
    
        res.status(200).json({
          success: true,
          message: "User orders add data successfully",
          data: updatedUser,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          
          error: error,
        });
      }
    }
  
  
export const UsersController = {
  createUsers,
  getAllUsers,
  getIdUsers,
  deletedUsers,
  updatedUsers,
  updatedUsersOrders
}


