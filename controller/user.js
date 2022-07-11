const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/user");

exports.createNewUser = (req, res, next) => {
  // console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "user create successfully",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};

exports.loin = (req, res, next) => {
  let fetchedUser;
  //  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      //    console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "auth failed tyty",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "they_should_no_longer",
        {
          expiresIn: "1hr",
        }
      );
      res.status(200).json({
        token: token,
        userId: fetchedUser._id,
        expiresIn: 3600,
      });
    })
    .catch((e) => {
      res.status(401).json({
        message: "auth failed",
      });
    });
};

// exports.getPhone=(req, res, next)=>{
//         User.find({},'phone',function(err, data){
//         res.json(data);

//     });
// }

exports.getPhone = (req, res, next) => {
  // const data=req.body.data
  const data = [
    { name: "Shubham", phone: 8421556999 },
    { name: "Akash", phone: 8421800900 },
    { name: "Harsh", phone: 8421801999 },
    { name: "Hari", phone: 8421800999 },
  ];
  try {
    const registeredUser = [];
    const nonRegisteredUser = [];
    let promise = new Promise((resolve, reject) => {
      data.forEach(async (element, index) => {
        const resul = await User.findOne({ phone: element.phone });
        if (resul) {
          registeredUser.push(element)
        } else {
          nonRegisteredUser.push(element)
        }
        if (index == data.length - 1) {
          resolve(registeredUser)
        }
      })
    });
    promise.then(result => {
      // console.log({registeredUser})
      res.status(200).json({ registeredUser, nonRegisteredUser, message: "Contacts Fetched Successfully" })
    })
  } catch (err) {
    res.status(404).json({ message: "Data Not Found", data: err })

  }


};

//GET DATA

exports.getUserAbout= async(req,res,next)=>{

  try{
    const result = await User.find();

    res.status(200).json({message :"About", result:result})
  }catch(e){
    res.status(404).json({message:"Data Not Found", result:e})
  }
  
}