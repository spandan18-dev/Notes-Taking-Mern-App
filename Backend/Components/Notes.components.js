import notes from '../model/notes.model.js'

// All notes :

const get = async (req,res)=>{
    try{
        const AllNotes = await notes.find().sort({ cretedAt : -1 });
        res.status(200).json(AllNotes)
    }catch(err){
        res.status(500).json({
        message: "Error in fetching notes",
        error: err.message || err
    })
    }
}

// Get a spicific Note  :
const getbyid = async (req,res)=>{
    try{
        const notebyid = await notes.findById(req.params.id)
        if(!notebyid) return res.status(404).json({message :"notes not found"})
        res.status(200).json(notebyid)
    }catch(err){
        res.status(500).json({message : "Error in fetching notes",error : err})
    }
}

// Create Notes :
const post = async(req,res)=>{
    try{
        const {title,content} = req.body
        const newData = await notes.create({
            title : title,
            content : content
        })
        res.status(200).json({message : "Notes created Sucesfully.."})
    }catch(err){
        res.status(500).json({
    message: "Error in Creating notes",
    error: err.message || err
});

    }
}

// Put Request :
const put = async(req,res)=>{
    try{
        const {title ,content} = req.body;
        const {id} = req.params
        const updateNote = await notes.findByIdAndUpdate(id,{title,content},{new :true});
        if(!updateNote) return res.status(404).json({message : "Id not found"})
        res.status(200).json({
            message : "Note Updated sucesfully",
        })
    }catch(err){
    res.status(500).json({
    message: "Error in Updating notes",
    error: err.message || err
});
    }
}

// Delete request :
const del = async(req,res)=>{
   try{
    const delNote = await notes.findByIdAndDelete(req.params.id)
    if(!delNote) return res.status(404).json({message:"Id not found"})
    res.status(200).json({
        message :"Note delete sucesfully...",
    })
   }catch(err){
    res.status(500).json({
    message: "Error in Deleting notes",
    error: err.message || err
});
   }
}

export {
    get,
    getbyid,
    post,
    put,
    del
}