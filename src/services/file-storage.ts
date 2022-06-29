const fs = require('fs');

import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import multer = require('multer');
import path = require('path');

type validFileExtension = 'png' | 'jpeg' | 'jpg';
type validMimeTypes = 'image/png' | 'image/jpeg' | 'image/jpg';

const validFileExtesions: validFileExtension[] = ["png", 'jpeg', 'jpg',];
const validMimeTypes: validMimeTypes[] = ['image/jpeg', 'image/jpg', 'image/png'];

export const saveFileToStorage: multer.Options = {
    storage: diskStorage({
        destination: './static',
        filename: (req, file, cb) =>
        {
            const fileExt: string = path.extname(file.originalname);
            const fileName: string = randomUUID() +  fileExt;

            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) =>
    {
        const allowedMimeTypes: validMimeTypes[] = validMimeTypes;
        allowedMimeTypes.includes(file.mimetype as validMimeTypes) ? cb(null, true) : cb(null, false)
    },
    limits: 
    {
        fileSize: 10 * 1024 * 1024,
    }
}