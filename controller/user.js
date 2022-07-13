const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/user");

exports.createNewUser = (req, res, next) => {

  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then(hash => {

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
      });

      user.save().then((result) => {

         return res.status(201).json({
              message: 'user create successfully',
              result: result
          });

      }).catch((err) => {

        return  res.status(500).json({
            message:"server side error",
              error: err
          });
      })
  })

}

// exports.loin = (req, res, next) => {
//   let fetchedUser;
//   console.log(req.body);
//   try {
//     User.findOne({ email: req.body.email }).then((user) => {
//           if (!user || user == null) {
//               return res.status(401).json({
//                   message: 'Account does not exists'
//               })
//           }
        
//           fetchedUser = user;
//           // user.password = '12345678';

//           bcrypt.compare(req.body.password, user.password).then(pass=>{
//             if(!pass){
//              return res.status(401).json({
//                 message: 'Incorrect Password'
//             });
//             }
//             else{
//               const token = jwt.sign(  { email: fetchedUser.email, userId: fetchedUser._id },
//                 "they_should_no_longer",
//                 {
//                   expiresIn: "1hr",
//                 });
//      return res.status(200).json({
//           token: token,
//           expiresIn: 3600,
//           userId: fetchedUser._id
       
//       });
//             }
//           })

          
//       }).catch(e => {
//           console.log(e);
//         return  res.status(401).json({
//               message: 'auth failed ..'
//           });
//       })
//   } 
//   catch (err) {
//     console.log(err)
//      return res.status(400).json({
//           message: 'Something went wrong'
//       });
//   }
// }


exports.loin = (req, res, next) => {
  let fetchedUser;
  console.log(req.body);
  User.findOne({ email: req.body.email }).then((user) => {
      console.log(user);
      if (!user || user == null) {
          return res.status(401).json({
              message: 'auth failed'
          })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
  }).then((result) =>{
    if (!result) {
      return res.status(401).json({
        message: 'auth failed'
      });
    }
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
       "It_would_NO_longer_exist", {
      expiresIn: "1hr",
    });
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
    });

  }).catch((e) => {
    console.log(e);
      res.status(401).json({
          message: 'auth failed'
      });
  })
};
exports.getPhone = (req, res, next) => {
  // const data=req.body.data
  const data = [
  { name: "Shubham", phone:  8766824323 },
    { name: "Akash Desai", phone: 8421800904 },
    { name: "Harsha", phone:9325661017 },
    { name: "Asif Mulla", phone: 9834327741 },
    { name: "Omkar Shinde", phone: 8788416096 },
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
      return res.status(200).json({ registeredUser, nonRegisteredUser, message: "Contacts Fetched Successfully" })
    })
  } catch (err) {
    return     res.status(404).json({ message: "Data Not Found", data: err })

  }


};

//GET DATA

exports.getUserAbout = async (req, res, next) => {
console.log(req.params);

  try {
    const result = await User.findById({_id:req.params.id});
    // const result = await User.findById();
    
    return res.status(200).json({ message: "About", result: result })
  } catch (e) {
    return res.status(404).json({ message: "Data Not Found", result: e })
  }

}

// exports.getUserAbout = async (req, res, next) => {
// console.log(req.params);

//   try {
//     const result = await User.findById({id:req.body.id});
//     // const result = await User.findById();
    
//     res.status(200).json({ message: "About", result: result })
//   } catch (e) {
//     res.status(404).json({ message: "Data Not Found", result: e })
//   }

// }