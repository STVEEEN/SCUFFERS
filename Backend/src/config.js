import dotenv from "dotenv";

dotenv.config();

export const config = {
    db : {
        URI : process.env.DB_URI
    },
    server : {
        PORT : process.env.PORT
    },
    emailAdmin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    },
    JWT: {
        secret: process.env.JWT_SECRET || "secret1234",
        expiresIn: process.env.JWT_EXPIRES1 || "30d"
      },
    cloudinary: {
        cloudinary_name: process.env.CLOUDINARY_NAME || "djxsqjpfh",
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY || "528121694288851",
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || "ar21c9M9pHsmJtgvT6YHB6jlHVE",
    }
};
