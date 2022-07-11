const Location = require("../model/Locat");

//GET METHOD
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


//POST METHOD
exports.addLocation = async (req, res, next) => {
  try {
    const location = await Location.create(req.body);

    return res.status(201).json({
      success: true,
      data: location,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This Location already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

//Patch Method
exports.patchLocations = async (req, res, next) => {
  console.log(req.params);

  Location.findOneAndUpdate(
    { Loaction: req.params.id },
    { $set: { 
      LocationId:req.body. LocationId,
      address:req.body. address,
      location:req.body.location,
      coordinates:req.body.coordinates,
      createdAt:req.body.createdAt,
    } },
    { new: true }
  ).then((doc) => {
    if (doc) {
      res
        .status(202)
        .json({ message: "Location Upadated Successfully", result: doc });
    } else {
      res
        .status(500)
        .json({ message: "Unable to update location", result: err });
    }
  });
};
