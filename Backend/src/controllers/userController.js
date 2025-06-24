const usersController = {};
import userModel from "../models/user.js";

usersController.getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

usersController.putUsers = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", updatedUser });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

usersController.deleteUsers = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ message: "Bad Request", error });
    }
};

export default usersController;
