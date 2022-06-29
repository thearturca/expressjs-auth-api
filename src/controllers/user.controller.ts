import { Request, Response, Router } from "express";
import { UserLoginDTO } from "../entities/user-login.DTO";
import { UserRegistrationDTO } from "../entities/user-registration.DTO";
import { UserDTO } from "../entities/user.DTO";
import { UserService } from "../services/user.service";

const UserController: Router = Router();
const userService: UserService = new UserService();

//  done - Регистрация пользователя (POST /user/register)
//      done - При регистрации указывает только Имя, Email, Пароль.
//      done - Пароль будет хранится как хеш 
//      done - Валидация входных параметров
UserController.post("/register", (req: Request<{}, {}, UserRegistrationDTO>, res: Response<UserDTO>, next) => 
{
    userService.createUser({email: req.body.email, firstName: req.body.firstName, secret: req.body.secret})
    .then(userDTO => res.json(userDTO))
    .catch((e: Error) => next(e));
});

//  done - Авторизация пользователя (POST /user/login)
//      done - JWT
//      done - Валидация входных параметров
UserController.post("/login", (req: Request<{}, {}, UserLoginDTO>, res, next) => 
{
    userService.loginUser({ email: req.body.email, secret: req.body.secret })
    .then(result => res.json(result))
    .catch((e: Error) => next(e));
});

export default UserController;
