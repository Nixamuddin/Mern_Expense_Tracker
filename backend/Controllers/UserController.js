import { generateToken } from "../Lib/GenerateToken.js";
import User from "../Model/User.js";
export const UserController = {
    
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).send({success:false, message:'All fields are Required'})
            }
            const ExistingUser = await User.findOne({ email });
            if (ExistingUser) {
                return res.status(400).send({success:true, message:"User Already Register"})
            }
            const Newuser = await User.create({ name, email, password });
            await Newuser.save();
            res.status(201).send({
                success: true, message: "User Register ", user: {
                    name: Newuser.name,
                    email:Newuser.email     
            }})
         }
        catch (error) {
            res.status(500).send({success:true, message:"Internal server error", error})
            console.log("error in Register", error)
        }
        
    },
    login: async (req, res) => {
        try {
            const {email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({success:false, message:'All fields are Required'})
            }
            const ExistingUser = await User.findOne({ email });
            if (!ExistingUser) {
                return res.status(400).send({success:true, message:"User Not Found"})
            }
            const isMAtch = await ExistingUser.compares(password);
            if (!isMAtch) { return res.status(400).send({ success: true, message: "Invalid Credentail" }) }
           const token= generateToken(ExistingUser._id, res)
            res.status(200).send({
                success: true, message: "User login SUccessfully ", user: {
                    token:token,
                    name: ExistingUser.name,
                    email:ExistingUser.email     
            }})
         }
        catch (error) {
            res.status(500).send({success:true, message:"Internal server error", error})
            console.log("error in loginr", error)
        }
        
    },

    updateProfile: async (req, res) => {
        try { 
            const user = await User.findById({ _id: req.userId });
            if (!user) {
                return res.status(404).send({success:false, message:"User Not found"})
            }
            const { name, email } = req.body;
            if (name) user.name = name;
            if (email) user.email = email
            await user.save();
            res.status(200).send({
                success: true, message: "profile Updated Successfully", user: {
                    name: user.name,
                    email:user.email
            }})
        }
        catch (error) {
            res.status(500).send({success:true, message:"Internal server error", error})
            console.log("error in loginr", error)
        }
    },
    changePassword: async (req, res) => {
        try { 
            const user = await User.findById({ _id: req.userId });
            if (!user) {
                return res.status(404).send({success:false, message:"User Not found"})
            }
            const { password } = req.body;
            if (password) user.password = password;
            await user.save();
            res.status(200).send({
                success: true, message: "password  Updated Successfully", user: {
                    name: user.name,
                    email:user.email
            }})
        }
        catch (error) {
            res.status(500).send({success:true, message:"Internal server error", error})
            console.log("error in loginr", error)
        }
    }
}

