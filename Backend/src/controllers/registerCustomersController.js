import customerModel from "../models/customers.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

const registerCustomersController = {};

registerCustomersController.register = async (req, res) =>{
    const {Name, Email, Age, Gender, phoneNumber, Membership, Password, timestamps} = req.body;

    try {
        //Verificamos si el cliente ya existe
        const existCustomer = await employeeModel.findOne({email})
        if(existCustomer) {
            return res.json ({message: "Usuario ya existe"})
        }

        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //Guardemos el Cliente muerto 
        const newCustomer = new customerModel ({Name,
            Email,
            Age, 
            Gender, 
            phoneNumber, 
            Membership, 
            Password: passwordHash,
            timestamps,
            })

            await newCustomer.save();

            //TOKEN
            jsonwebtoken.sign(
                //1- Que voy a guardar 
                {id: newCustomer._id}, 
                //2- secreto
                config.JWT.secret,
                //3- Cuando expira
                {expiresIn: config.JWT.expiresIn},
                //4- Funcion flecha
                (error, token) => {
                    if(error) console.log(error)
                        res.cookie("authToken", token)
                    res.json({message: "Usuario registrado"})
                }
            );

    } catch (error) {
        console.log(error);
    }
};