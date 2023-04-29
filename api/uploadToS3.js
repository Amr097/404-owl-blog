const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const bucket='amr-blogging-app'

const uploadToS3 = async(path, mimemtype, fileName)=>{
    const client = new S3Client({
        region: 'eu-central-1',
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_SECRET_KEY
        }
    })
    
    const data = await client.send(new PutObjectCommand({
            Bucket: bucket,
            Body: fs.readFileSync(path),
            Key: fileName,
            ContentType: mimemtype,
            ACL: 'public-read'
        }));
    
        
 return `https://${bucket}.s3.amazonaws.com/${fileName}`;   
   
   
}

module.exports = uploadToS3;