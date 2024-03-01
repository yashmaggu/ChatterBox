import User from "../models/user.models.js";
export const getUsersForSidebar =async (req,res)=>{
    try{
         const loggedInUserId = req.user._id;
         const allUserExpextLoggedInOne=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
         res.status(200).json(allUserExpextLoggedInOne);
    }catch(error){
        console.log("Error in getting user for sidebar " + error.message);
        res.status(500).json({error:"Error in sidebar"});
    }
}