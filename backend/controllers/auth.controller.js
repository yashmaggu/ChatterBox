import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";


// signup function
export const signUp=async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;

        //password and cxonfirmpassword must be same
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords doesnt match "});
        }

        //find if there is some another user with same username or not
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({error:"username already exists Use different Username"});
        }

        //hashed Password
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        //profile avatars

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser=new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });


        if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
    }catch(error){
        console.log("error in signup controller ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}






//login function
export const login = async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;
        
        // Find the existing user by username
        const existingUser = await User.findOne({ username });
        if(existingUser){
            console.log("found existing user");
        }

        if(!existingUser){
            res.status(400).json({ error: "Invalid request user doesnt exist" });
        }
        if(password !== existingUser.password){
            res.status(400).json({error:"Password does not match"})
        }
        // Set cookies (assuming generateTokenAndSetCookie is defined)
        generateTokenAndSetCookie(existingUser._id, res);

        // Respond with the user's information
        res.status(200).json({
            _id: existingUser._id,
            fullName: existingUser.fullName,
            username: existingUser.username,
            profilePic: existingUser.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};





//logout function
export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logout successfully"});
    }catch(error){
        console.log("Error in logout controller",error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}