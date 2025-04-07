import dotenv from "dotenv";

dotenv.config();

export const config = {
    db : {
        URI : process.env.URI
    },
    server : {
        PORT : process.env.PORT
    },

    JWT: {
        secret: process.env.JWT_SECRET || "sdfsdf",
        expireIn: process.env.JWT_EXPIRES1 || "30d"
      }
};