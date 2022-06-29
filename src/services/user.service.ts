import fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ROUTER_CONST, STATIC_PATH } from '../constants/constants';
import { UserLoginDTO } from '../entities/user-login.DTO';
import { UserSignedDTO } from '../entities/user-signed.DTO';
import { UserUpdateDTO } from '../entities/user-update.DTO';
import { UserDTO } from '../entities/user.DTO';
import HttpException from '../exceptions/http-exception';
import { UserOrmEntity } from "../persistence/user.orm-entity";
import { ValidateService } from './validate.service';
import { resolve } from 'path';

export interface CreateUserEntity
{
    email: string;
    firstName: string;
    secret: string;
}

export interface UsersWithPaginations
{
    users: UserDTO[],
    pagination: 
    {
        page: number,
        count: number,
        maxPage: number,
        isLastPage: boolean,
        isFirstPage: boolean
    }
}


export class UserService
{
    constructor() {}

    async createUser(createUserEntity: CreateUserEntity): Promise<UserDTO> 
    {
        //  validate user input
        ValidateService.validateCreateUserEntity(createUserEntity);

        //  check if email already exist in database
        const isUserExitst = await UserOrmEntity.findOne({where: {$email$: createUserEntity.email}});
        if (isUserExitst)
        {
            throw new HttpException(409 ,"User already exist");
        }

        //  salt user password with bcrypt
        const hashedSecret: string = await bcrypt.hash(createUserEntity.secret, 10);
        const savedUserOrmEntity: UserOrmEntity = await UserOrmEntity.create(
            { 
                createdAt: new Date(), 
                email: createUserEntity.email, 
                firstName: createUserEntity.firstName, 
                secret: hashedSecret 
            });

        return UserService.mapUserOrmEntityToDTO(savedUserOrmEntity);

    }

    async loginUser(userLoginDTO: UserLoginDTO): Promise<UserSignedDTO>
    {
        //  validate user input
        ValidateService.validateUserLoginEntity(userLoginDTO);

        //  find user by given email
        const userOrmEntity: UserOrmEntity | null = await UserOrmEntity.findOne({where: {$email$: userLoginDTO.email}});
        if (userOrmEntity === null)
        {
            throw new HttpException(404, "User doesn`t exist");
        }

        //  compare given secret and secret stored in database
        const isMatch: boolean = await bcrypt.compare(userLoginDTO.secret, userOrmEntity.secret);
        if (!isMatch)
        {
            throw new HttpException(409, "Incorrect email or password")
        }

        
        return {
            accessToken: jwt.sign(UserService.mapUserOrmEntityToDTO(userOrmEntity), process.env.SECRET_TOKEN || "test_sb", {algorithm: 'HS256'}),
        ...UserService.mapUserOrmEntityToDTO(userOrmEntity)
        }
    }

    async getUserById(id: number): Promise<UserDTO>
    {
        //  load user from database
        const userOrmEntity: UserOrmEntity | null = await UserOrmEntity.findOne({where: {$id$: id}})
        if (userOrmEntity === null)
        {
            throw new HttpException(404, "User doesn`t exist");
        }
        return UserService.mapUserOrmEntityToDTO(userOrmEntity);
    }

    async updateUserById(id: number, userUpdateDTO: UserUpdateDTO): Promise<UserDTO>
    {
        //  validate user input
        ValidateService.validateUserUpdateDTO(userUpdateDTO);
        
        //  load user from database
        const userOrmEntity: UserOrmEntity | null = await UserOrmEntity.findOne({where: {$id$: id}})
        if (userOrmEntity === null)
        {
            throw new HttpException(404, "User doesn`t exist");
        }

        //  change property or leave same if undefined or null
        userOrmEntity.email = userUpdateDTO.email || userOrmEntity.email;
        userOrmEntity.firstName = userUpdateDTO.firstName || userOrmEntity.firstName;
        userOrmEntity.lastName = userUpdateDTO.lastName || userOrmEntity.lastName;
        userOrmEntity.gender = userUpdateDTO.gender || userOrmEntity.gender;
        userOrmEntity.photo = userUpdateDTO.photo || userOrmEntity.photo;

        await userOrmEntity.save();
        return UserService.mapUserOrmEntityToDTO(userOrmEntity);
    }

    async updatePhotoById(id: number, photo: string): Promise<UserDTO>
    {
        const userOrmEntity: UserOrmEntity | null = await UserOrmEntity.findOne({where: {$id$: id}})
        if (userOrmEntity === null)
        {
            throw new HttpException(404, "User doesn`t exist");
        }

        //  delete prev photo if exist
        if (userOrmEntity.photo)
        {
            try 
            {
                fs.unlinkSync(resolve(STATIC_PATH.STATIC, userOrmEntity.photo));
            } catch (error) 
            {
                console.log(error);
            }
        }
        
        userOrmEntity.photo = photo;
        await userOrmEntity.save();
        return UserService.mapUserOrmEntityToDTO(userOrmEntity);
    }

    async getAllUsersWithPagination(page: number): Promise<UsersWithPaginations>
    {
        //  validate given page variable
        const validPage: number = !page || page <= 0 ? 1 : page;

        const pageLimit: number = 10;
        const calcPageOffset = (pageNumber: number) => (Math.floor(pageNumber) - 1) * pageLimit;
        let pageOffset: number = calcPageOffset(validPage);
        
        let userOrmEntities = await UserOrmEntity.findAndCountAll({
            limit: pageLimit,
            offset: pageOffset
        });
        
        const isFirstPage: boolean = pageOffset === 0; 
        const isLastPage: boolean = calcPageOffset(validPage + 1) >= userOrmEntities.count;
        const maxPage: number = Math.ceil(userOrmEntities.count / pageLimit);

        if (validPage > maxPage)
        {
            pageOffset = calcPageOffset(maxPage);
            userOrmEntities = await UserOrmEntity.findAndCountAll({
                limit: pageLimit,
                offset: pageOffset
            });
        }

        const usersDTO: UserDTO[] = [];
        userOrmEntities.rows.map((userOrmEntity) => usersDTO.push(UserService.mapUserOrmEntityToDTO(userOrmEntity)));
        return {
            pagination: 
            {
                count: userOrmEntities.count,
                page: Math.ceil(pageOffset / pageLimit) + 1,
                isFirstPage: isFirstPage,
                isLastPage: isLastPage,
                maxPage: maxPage,
            },
            users: usersDTO,
        };
    }

    static mapUserOrmEntityToDTO(userOrmEntity: UserOrmEntity): UserDTO
    {
        return {
            id: userOrmEntity.id, 
            createdAt: userOrmEntity.createdAt, 
            email: userOrmEntity.email, 
            firstName: userOrmEntity.firstName, 
            lastName: userOrmEntity.lastName || null, 
            gender: userOrmEntity.gender || null, 
            photo: `${ROUTER_CONST.STATIC}/${userOrmEntity.photo}` || null
        }
    }
}