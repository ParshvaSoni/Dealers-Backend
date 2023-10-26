import { Router } from "express";
import AWS from 'aws-sdk'
import fs from 'fs';
import { authVerify } from "../utils/create-verify-JWT.js";


const bucketRouter = Router();
// Configure AWS SDK
const bucketName = 'imagebucket44';

const s3 = new AWS.S3({
    endpoint: 'https://s3.us-east-005.backblazeb2.com',
    accessKeyId: '00571c22a1d3f5c0000000002',
    secretAccessKey: 'K005c7Khw/fQuv3/7PAPTmewnT7YRq8',
    s3ForcePathStyle: true, // Required for Backblaze B2
});

bucketRouter.post('/uploadFile', authVerify, (req, res) => {
    try {
        if (!req.body.file) {
            // console.log(req)
            return res.status(400).json({ success: 0, message: 'No file provided', data: null });
        }

        const imageDataUrl = req.body.file;

        // Split the data URL into its parts (data:image/type;base64,data)
        const imageDataParts = imageDataUrl.split(',');
        if (imageDataParts.length !== 2) {
            return res.status(400).json({ success: false, message: 'Invalid image data URL' });
        }

        // Extract the base64-encoded data
        const imageDataBase64 = imageDataParts[1];

        // Decode the base64 data into binary
        const imageDataBuffer = Buffer.from(imageDataBase64, 'base64');

        // Specify the local path where you want to save the image
        const localImagePath = './testImage/' + req.body.fileName;

        // Now, you can upload the saved file to Backblaze B2
        const params = {
            Bucket: bucketName,
            Key: req.body.fileName,
            Body: fs.createReadStream(localImagePath), // Read the file from the server's file system
            ContentType: req.body.fileType, // Use the file's MIME type
        };

        fs.writeFile(localImagePath, imageDataBuffer, 'base64', (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error saving image' });
            }


            s3.upload(params, (uploadErr, data) => {
                if (uploadErr) {
                    console.error('Error uploading file to Backblaze:', uploadErr);
                    return res.status(500).json({ success: 0, message: 'Error In Uploading File', data: null });
                }

                console.log('File uploaded to Backblaze:', data);

                // Optionally, you can remove the local file after uploading it to Backblaze
                fs.unlink(localImagePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error deleting local file:', unlinkErr);
                    }
                });

                res.json({ success: 1, message: 'File uploaded successfully', data: data.Location });
            });

        });
    }
    catch (err) {
        const localImagePath = './testImage/' + req.body.fileName;
        fs.unlink(localImagePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting local file:', unlinkErr);
            }
        });
        return res.status(500).json({success:0,message:"Error in uploading file from backend",data:null})
    }

    // Upload the file to Backblaze B2

});

bucketRouter.delete('/deleteFile/:path', async (req, res) => {
    try {
        const objectKey = req.params.path;
        const params = {
            Bucket: bucketName,
            Key: objectKey,
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                console.error('Error deleting object:', err);
                return res.status(500).json({ success: 0, message: 'Error In Deleting File', data: null });
            }
            console.log('Object deleted:', objectKey);
            res.json({ success: 1, message: 'Object deleted successfully', data: null });
        });
    }
    catch (err) {

    }
})

export default bucketRouter;
