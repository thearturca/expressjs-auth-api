import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export enum genderEnum 
{
    male = 'Male',
    female = 'Female'
}


//  - У каждого пользователя должно быть ID, Имя, Фамилия, Email, Пароль, Пол (Мужской, Женский), Фото, Дата регистрации.
export class UserOrmEntity extends Model<InferAttributes<UserOrmEntity>, InferCreationAttributes<UserOrmEntity>> 
{
    declare id: number | null;
    declare firstName: string;
    declare lastName: string | null;
    declare email: string;
    declare secret: string;
    declare gender: genderEnum | null;
    declare photo: string | null;
    declare createdAt: Date;
}
