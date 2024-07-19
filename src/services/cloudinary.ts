import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config();

// cloudinary.config({
//   cloud_name: "dyawq6e7r",
//   api_key: "844611149398845",
//   api_secret: "xn9B4Tmz_x_hYWe6JbwQGZgmJuk",
//   secure: true,
// });

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});



export default cloudinary;
