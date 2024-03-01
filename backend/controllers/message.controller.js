import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendmessage =async(req, res) => {
    try{
        const { message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let conversation=await Conversation .findOne({
            participants:{$all:[senderId,receiverId]},
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newmessage=new Message({
            senderId,
            receiverId,
            message
        })
        if(newmessage){
            conversation.messages.push(newmessage._id);
        }
        // await conversation.save();
        // await newmessage.save();

        await Promise.all([conversation.save(), newmessage.save()]);
        res.status(201).json(newmessage)
    }catch(error){
        console.log("error in sendmessage controller: " + error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}


export const getMessage=async (req, res) => {
    try{
        const {id:usertochatid}=req.params;
        const senderId=req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all :[senderId,usertochatid]}
        }).populate("messages");
        if(!conversation){
            return res.status(200).json([]);
        }
        const message = conversation.messages; 
        res.status(200).json(message);
    }catch(error){
        console.log("error in getMessageController",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}