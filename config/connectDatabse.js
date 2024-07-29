import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);

        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("connect to DB")
        })

        connection.off('error', (error) => {
            console.log('Connection failed ', error)
        })
    } catch (err) {
        console.log("Database connection failed ", err)
    }
}

export { main }