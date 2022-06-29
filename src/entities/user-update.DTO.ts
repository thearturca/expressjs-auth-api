import { gender } from "../persistence/user.orm-entity";

export interface UserUpdateDTO
{
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    gender?: gender | null;
    photo?: string | null;
}