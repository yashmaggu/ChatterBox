import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId ,io } from "../socket/socket.js";

export const sendmessage =async(req, res) => {
    try{ 
        //  /api/messages/send/:(receiver_id)
        const { message}=req.body;

        //id in urlto which message is to sent
        const {id:receiverId}=req.params;

        //logged in user trying to set message
        const senderId=req.user._id;

        //finding all conversations between  receiver and sender ids
        let conversation=await Conversation .findOne({
            participants:{$all:[senderId,receiverId]},
        })
        //if no conversation than create one conversation
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newmessage=new Message({
            senderId,
             receiverId:receiverId,
            message
        })
        if(newmessage){
            conversation.messages.push(newmessage._id);
        }

        await Promise.all([conversation.save(), newmessage.save()]);
        //now sockets for real time communication 
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newmessage);
		}
        res.status(201).json(newmessage)
    }catch(error){
        console.log("error in sendmessage controller: " + error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}


export const getMessage=async (req, res) => {
    // /api/messages/:{user whom we want to chat :id}
    try{
        //user to whom we want to chat 
        const {id:usertochatid}=req.params;
        //we who want to chat
        const senderId=req.user._id;

        //finding a conversation between them 
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