import { UserLoginDTO } from "../entities/user-login.DTO";
import { UserUpdateDTO } from "../entities/user-update.DTO";
import HttpException from "../exceptions/http-exception";
import { genderEnum } from "../persistence/user.orm-entity";
import { CreateUserEntity } from "./user.service";

export class ValidateService
{
    static validateCreateUserEntity(createUserEntity: CreateUserEntity): CreateUserEntity 
    {
        if (!ValidateService.isString(createUserEntity.email))
        {
            throw new HttpException(409, "email should be a string")
        }
        if(!ValidateService.isEmail(createUserEntity.email))
        {
            throw new HttpException(409, "Invalid email")
        }
        if (!ValidateService.isString(createUserEntity.secret))
        {
            throw new HttpException(409, "email should be a string")
        }
        if (!ValidateService.isString(createUserEntity.firstName))
        {
            throw new HttpException(409, "firstName should be a string")
        }
       
        return createUserEntity;
    }

    static validateUserLoginEntity(userLoginDTO: UserLoginDTO): UserLoginDTO 
    {
        if (!ValidateService.isString(userLoginDTO.email))
        {
            throw new HttpException(409, "email should be a string")
        }
        if(!ValidateService.isEmail(userLoginDTO.email))
        {
            throw new HttpException(409, "Invalid email")
        }
        if (!ValidateService.isString(userLoginDTO.secret))
        {
            throw new HttpException(409, "email should be a string")
        }

        return userLoginDTO;
    }

    static validateUserUpdateDTO(userUpdateDTO: UserUpdateDTO): UserUpdateDTO
    {
        if (userUpdateDTO.email && !ValidateService.isString(userUpdateDTO.email))
        {
            throw new HttpException(409, "email should be a string")
        }
        if (userUpdateDTO.email && !ValidateService.isEmail(userUpdateDTO.email))
        {
            throw new HttpException(409, "Invalid email")
        }

        if (userUpdateDTO.firstName && !ValidateService.isString(userUpdateDTO.firstName))
        {
            throw new HttpException(409, "firstName should be a string")
        }

        if (userUpdateDTO.lastName && !ValidateService.isString(userUpdateDTO.lastName))
        {
            throw new HttpException(409, "lastName should be a string")
        }

        if (userUpdateDTO.gender && !ValidateService.isString(userUpdateDTO.gender))
        {
            throw new HttpException(409, "gender should be a string")
        }
        if (userUpdateDTO.gender && !ValidateService.isGender(userUpdateDTO.gender))
        {
            throw new HttpException(409, "gender should be Male or Female")
        }
        if (userUpdateDTO.photo && !ValidateService.isString(userUpdateDTO.photo))
        {
            throw new HttpException(409, "photo should be a string")
        }
        return userUpdateDTO;
    }

    static isString(value: string): boolean
    {
        return typeof value === "string";
    }

    static isEmail(email: string): boolean
    {
        //  RFC2822 email regexp
        const regEmail = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        return regEmail.test(email);
    }

    static isGender(gender: string): boolean
    {
        switch(gender)
        {
            case genderEnum.male:
            case genderEnum.female:
                return true;
            default: 
            return false;
        }
    }
}
