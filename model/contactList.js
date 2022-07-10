const mongoose= require("mongoose");

const constactSchema =new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name:{type:String},
      number:{type:[Number]},
})

module.exports=mongoose.model("Contact",constactSchema);