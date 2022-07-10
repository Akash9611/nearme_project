const Contact=require("../model/contactList");


//POST MEthod
exports.postContact= async(req, res, next)=>{
    try{
        const constact= await Contact.create(req.body);

        res.status(201).json({success:true, result:constact})
    }catch(err){
        res.status(400).json({message:"Please Allow Contact Permission", result:err})
    }
}

exports.getContact= async(req,res, next)=>{
    try{
        const contacts= await Contact.find();

        return res.status(200).json({data:contacts});
    }catch(err){
        res.status(404).json({message:"contact not found", result:err})
    }
};