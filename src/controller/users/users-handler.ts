import { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "../../model/user-model";
import { UserService } from "../../service/user-service";

export class UsersHandler {
  
  static async registerHandler(req: Request, res: Response, next: NextFunction) {
    try {
      // tangkep data payload req conversi ke 
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}