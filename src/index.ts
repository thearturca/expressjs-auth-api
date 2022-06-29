import express, { Response, Request, NextFunction } from "express";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { Sequelize } from "sequelize";
import ProfileController from "./controllers/profile.controller";
import UserController from "./controllers/user.controller";
import HttpException from "./exceptions/http-exception";
import UserPersistenceModule from "./persistence/user-persistence.module";
import * as dotenv from "dotenv"
import { UserService } from "./services/user.service";
import { ROUTER_CONST, STATIC_PATH } from "./constants/constants";

//  load config from env
dotenv.config();

const app = express();
app.use(express.json());

//  Port for express http listen
const port: number = 5000;

//  done - Используется ORM (Любая) - используется Sequlize
//  Configure connection to Database
const sequelize: Sequelize = UserPersistenceModule();

//  Connect to Database
sequelize.authenticate()
.then(() => console.log("Connected to DB"))
.catch(console.log);

//  using Oauth 2.0 authorization with "Bearer" header prefix
app.use(expressjwt({ secret: process.env.SECRET_TOKEN || "test_sb", algorithms: ["HS256"] }).unless({ path: ["/user/register", "/user/login", /^\/static\/.*/],  }));

//  Map controllers
app.use(ROUTER_CONST.USER, UserController);

//  done - Используется JWT
app.use(ROUTER_CONST.PROFILE, ProfileController);

//  Получение всех пользователей с пагинацией (GET /profiles?page=1, 10 на страницу)
//  done - Используется JWT
//  done - При получение всех пользователей с пагинацией сортировать по дате регистрации.
app.use(ROUTER_CONST.PROFILES, (req: Request<{}, {}, {}, {page: string}>, res, next) => 
{
    const userService: UserService = new UserService();

    userService.getAllUsersWithPagination(+req.query.page)
    .then(result => res.json(result))
    .catch((e: Error) => next(e));
});


//  Map route for static files
//  done - Проверка фото по размеру, и формату (до 10 мб, .jpg, .png)
//  done - В базе данных хранить только название файла, все фото должны лежать в папке и раздаваться статически.
app.use(ROUTER_CONST.STATIC, express.static(STATIC_PATH.STATIC));


//  Error handler middleware
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => 
{
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).send({ status, message });
});

app.listen(port, () => console.log("listening to port = " + port));
