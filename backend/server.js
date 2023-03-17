import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.js'
import profileRoutes from './routes/profile.js'
import postRoutes from './routes/post.js'
import messageRoutes from './routes/messages.js'
import conversationRoutes from './routes/conversations.js'
import commentRoutes from './routes/comments.js'
import { cloudinaryConfig } from './utils/cloudinary.js'
dotenv.config()

/**CONNECTING TO DATABASE */
import connectDB from './config/db.js'
connectDB()



/** SOCKET CONNECTION */
import http from 'http'
import {Server} from 'socket.io'
const app = express()

const server = http.createServer(app)
export const io = new Server(server, {
    cors:{
        origin:"http://localhost:3002",
        methods: ["GET", "POST"],
    }
})

io.on("connection",(socket)=>{
    console.log('user connected',socket.id)
    socket.on("disconnect", ()=>{
        console.log("user disconnected ", socket.id)
    })

    socket.on("join_room", (data)=>{
        socket.join(data.room)
        console.log(`${data.username} joined the room ${data.room} with id ${socket.id}`)
    })

    socket.on('send_message',(data)=>{
        socket.to(data.room)
    })
})


/** CONFIGURATIONS */
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('*', cloudinaryConfig)
app.use(cors())


// BACKEND APIS ROUTES

app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)


const port = process.env.PORT || 5000
server.listen(port, ()=>console.log(`server is running on port ${port}`))