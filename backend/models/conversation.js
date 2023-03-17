import mongoose from "mongoose";

const {ObjectId} = mongoose.SchemaTypes 

const conversationSchema = new mongoose.Schema({

members: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
}],

}, {timestamps: true})

export default mongoose.model("Conversation", conversationSchema)