
// require('dotenv').config();
import dotenv from 'dotenv';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

dotenv.config();

export const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
