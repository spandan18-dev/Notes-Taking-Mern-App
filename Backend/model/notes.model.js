import mongoose from 'mongoose'
// Schema 

const notesSchema = new mongoose.Schema({
    title :{
        type :String,
        require:true
    },
    content :{
        type :String,
        require:true
    },
},
{timestamps : true}   // CreatedAt UpdatedAt
)

const notes = mongoose.model("Note",notesSchema)

export default notes