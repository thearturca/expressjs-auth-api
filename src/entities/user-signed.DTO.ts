import { gender } from "../persistence/user.orm-entity";

export interface UserSignedDTO
{
    accessToken: string;
    id: number | null;
    firstName: string;
    lastName: string | null;
    email: string;
    gender: gender | null;
    photo: string | null;
    createdAt: Date;
}