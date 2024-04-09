import { prismaClient } from "../application/database";
import { ResponseError } from "../exeption/response-error";
import { CreateUserRequest, UserResponse, mapUserModel } from "../model/user-model";
import { UserValidation } from "../validation/users/user-validation";
import { Validation } from "../validation/users/validation";
import bcrypt from "bcrypt";

  export class UserService {
    //method for regis
    static async register(request: CreateUserRequest) : Promise<UserResponse> {

      // validation req data
      const requestRegister = Validation.validate(UserValidation.REGISTER, request);

      // verify username exist
      const verifyUsernameExist = await prismaClient.user.count({
        where: {
          username: requestRegister.username
        }
      });
      
      // check is username aready exist
      if (verifyUsernameExist != 0) {
        throw new ResponseError('username already exits ', 400);  
      }

      // hash password to bcrypt
      requestRegister.password = await bcrypt.hash(requestRegister.password, 10);

      // final insert into req payload to users table with prisma orm
      const user = await prismaClient.user.create({
        data: requestRegister
      });

      return mapUserModel(user);
    }
  }