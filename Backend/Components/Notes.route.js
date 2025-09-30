// Get request :
const get = (req,res)=>{
    res.status(200).send("Notes")
}

// Post request :
const post = (req,res)=>{
    res.status(201).json({message : "Notes created sucesfully..."})
}

// Put Request :
const put = (req,res)=>{
    res.status(200).json({message : "updated sucesfully ..."})
}

// Delete request :
const del = (req,res)=>{
    res.status(200).json({message :"deleted sucesfully"})
}

export {
    get,
    post,
    put,
    del
}