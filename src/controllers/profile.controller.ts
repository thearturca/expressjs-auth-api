import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import { UserUpdateDTO } from "../entities/user-update.DTO";
import HttpException from "../exceptions/http-exception";
import { saveFileToStorage } from "../services/file-storage";
import { UserService } from "../services/user.service";

const ProfileController: Router = Router();
const userService: UserService = new UserService();

//  limits the size of file to 10 MB and file extensions to .png and .jpg/.jpeg
const upload: multer.Multer = multer(saveFileToStorage)

//  done - Получение пользователя (GET /profile/[id])
ProfileController.get("/:id", (req: Request<{id: number}>, res: Response, next: NextFunction) => 
{
    userService.getUserById(req.params.id)
    .then((result => res.json(result)))
    .catch((e: Error) => next(e));
});

//  done - Редактирование пользователя (PUT /profile/[id])
//      done - При редактировании можно менять всю информацию кроме ID, Пароля, Дата регистрации.
// !!!Редактирование не ограничено, т.е. любой авторизованный пользователь может редактировать любого другого пользователя. В ТЗ про это ничего не было написано.!!!
ProfileController.put("/:id", (req: Request<{id: number}, {}, UserUpdateDTO>, res: Response, next: NextFunction) => 
{
    userService.updateUserById(req.params.id, req.body)
    .then(result => res.json(result))
    .catch((e: Error) => next(e))
});

//  done - upload photo endpoint
ProfileController.post("/:id/photo", upload.single('file'), (req, res, next) =>
{
    if (!req.file?.filename) throw new HttpException(409, "invalid file type");

    userService.updatePhotoById(+req.params.id, req.file.filename)
    .then((result => res.json(result)))
    .catch((e: Error) => next(e));
})

export default ProfileController;
