const { default: mongoose } = require("mongoose");
const Location = require("../model/Locat");
const User = require("../model/user")

//POST METHOD
exports.addLocation = async (req, res, next) => {
  console.log(req.body);
  try {
    const location = await Location.create({
      // LocationId:  req.params.id,
      LocationId: mongoose.Types.ObjectId(req.body.LocationId),

      address: req.body.address,
      location: {
        type: "Point",
        coordinates: [req.body.latitude, req.body.longitude]
      },
    });

    return res.status(201).json({
      success: true,
      data: location,
      message: "User location Fetched"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

//GET METHOD
// exports.getLocations = async (req, res, next) => {
//   try {
//     const locations = await Location.find();

//     return res.status(200).json({
//       success: true,
//       count: locations.length,
//       data: locations,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };


exports.getLocations = async (req, res, next) => {
  console.log(req.params);

  Location.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "LocationId",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    {
      $project: {
        address: 1,
        location: 1,
        // name:"$userInfo",
        "userInfo.name": 1,
        // name:"$userInfo.name"
        // name: { $arrayElemAt: ["userInfo.name", 1] },
      }
    }
  ]).then((doc) => {

    updateUserInfo = [];
    doc.forEach(r => {
      // console.log(r.userInfo);
      updateUserInfo.push({
        address: r.address,
        latitude: r.location.coordinates[0],
        longitude: r.location.coordinates[1],
        name: r.userInfo.length != 0 ? r.userInfo[0].name : ''
      })
    })

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: updateUserInfo,
    });
  })
    .catch((e) => {
      console.log(e);
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    });
}

//To get nearest user location

exports.getNearLocations = async (req, res, next) => {
  console.log(req.params);
  try {
    const nearestLocations = await Location.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "point",
            // coordinates: [req.body.latitude, req.body.longitude,]
            coordinates: [16.7033673,74.22148]
          },
          $minDistance: 0,
          $maxDistance: 10000
        }
      }
    });

    res.status(200).json({
      success: true,
      data: nearestLocations,
      message: "Users Found Successfully"
    });

  } catch (e) {
    res.status(200).json({ message: "Data not found", error: e });

  };
};

//Patch Method
exports.patchLocations = (req, res, next) => {
  console.log(req.params);

  Location.findOneAndUpdate(
    { LocationId: mongoose.Types.ObjectId(req.body.LocationId) },
    {
      $set: {
        // LocationId:req.body. LocationId,
        address: req.body.address,
        location: {
          type: "Point",
          coordinates: [req.body.latitude, req.body.longitude]
        }
        // createdAt:req.body.createdAt,
      }
    },
    { new: true }
  ).then((doc) => {
    console.log(doc);

    res
      .status(200)
      .json({ message: "Location Upadated Successfully", result: doc });

  }).catch((e) => {
    console.log(e);
    res
      .status(500)
      .json({ message: "Unable to update location", result: [], error: e });
  });
};
