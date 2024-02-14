
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;


          
cloudinary.config({ 
  cloud_name: 'djs1irzcn', 
  api_key: '437148446323912', 
  api_secret: 'nuL-ENxCTtMdtD6_HtrslwJotGY' 
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto"
    });

    // File uploaded successfully
    console.log("File uploaded successfully", response.url);
    fs.unlinkSync(req.file.path); 
    res.status(200).json({ url: response.url });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { uploadImage };