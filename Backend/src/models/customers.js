import { Schema, model } from "mongoose";

const usersSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
    },

    Age: {
      type: Number,
      required: true,
    },

    Gender: {
      type: String,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    Membership: {
      type: String,
    },
    
    Password: {
      type: Number,
      require: true,
      min: 8,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
  
);

export default model("users", usersSchema);
