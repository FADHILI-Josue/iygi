import mongoose from 'mongoose'

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URL)
        console.log('Successfully connected to MongoDB')

        mongoose.connection.on('Disconnected', () => {
            console.log('Disconnected from MongoDB')
        })
    } catch (error) {
        throw error
    }
}
export default connectToMongoDB