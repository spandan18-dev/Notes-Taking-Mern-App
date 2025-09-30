import mongoose from 'mongoose'
import debug from 'debug' ; const dblog = debug("dev:db")

const connectDB = async (dburl)=>{
    try{
        await mongoose.connect(dburl)
        dblog("DataBase connected ...")
    }catch(e){
        dblog("Fail to connect database",e)
    }
}

export default connectDB