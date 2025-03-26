const User = require("../Models/User");

const signup = async (req, res) => {
    try {
      const { name, UDid, email, phone, district } = req.body;
      
      const idProofFiles = req.files['proff'] || [];
      const uDidImgFiles = req.files['UDidimg'] || [];
      const passportImageFiles = req.files['passportImage'] || [];
  
      if (!name || !UDid || !email || !phone || !district) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (idProofFiles.length === 0 && uDidImgFiles.length === 0 && passportImageFiles.length === 0) {
        return res.status(400).json({ message: "At least one image is required for Idproff, UDidimg, and passportImage" });
      }
  
      const existingUser = await User.findOne({
        $or: [{ UDid: UDid.trim() }, { email: email.trim() }],
      });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already signed up with this UDid or Email' });
      }
  
      const imgUrlsIdProof = idProofFiles.map(file => `/uploads/${file.filename}`);
      const imgUrlsUDidImg = uDidImgFiles.map(file => `/uploads/${file.filename}`);
      const imgUrlsPassportImage = passportImageFiles.map(file => `/uploads/${file.filename}`);
  
      const newUser = new User({
        name: name.trim(),
        UDid: UDid.trim(),
        email: email.trim(),
        phone: phone,
        district: district.trim(),
        proof: imgUrlsIdProof,
        UDidimg: imgUrlsUDidImg,
        passportImage: imgUrlsPassportImage
      });
  
      await newUser.save();
      res.status(200).json({ message: "New User signed up successfully", newUser });
    } catch (error) {
      console.error("Error in Signup:", error);
      res.status(500).json({ message: error.message });
    }
  }
const getUser = async (req, res) => {
    const {district} = req.query;
    try {
      const UserDetail = await User.find({district: district});
      res.status(200).json(UserDetail);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
  
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, UDid, email, phone, district, proof, UDidimg, passportImage, status } = req.body;
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.name = name || user.name;
      user.UDid = UDid || user.UDid;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.district = district || user.district;
      user.proof = proof || user.proof;
      user.UDidimg = UDidimg || user.UDidimg;
      user.passportImage = passportImage || user.passportImage;
      user.status = status || user.status;
  
      await user.save();
  
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ error: "Error updating user", desc: error.message });
    }
  }
  
  

module.exports = {signup, getUser, getUserById, updateUser}