import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        
        // Upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Delete file from local storage
        try {
            fs.unlinkSync(localFilePath);
        } catch (error) {
            console.log("Error deleting local file:", error);
        }

        return response;
    } catch(err) {
        console.log("Cloudinary upload error:", err);
        return null;
    }
}


export {uploadOnCloudinary}
