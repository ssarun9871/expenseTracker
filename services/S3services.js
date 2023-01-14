const AWS = require('aws-sdk');
exports.uploadToS3 = async(data,filename)=>{
    return new Promise((resolve,reject)=>{
        const bucket_name='expensetracker9871';
        const IAM_user_key ='AKIAUAUCJ7BZQ762CX7B';
        const IAM_user_secret='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';
       
        let s3bucket = new AWS.S3({
           accessKeyId :IAM_user_key,
           secretAccessKey:IAM_user_secret,
        })
           var params = {
               Bucket:bucket_name,
               Key:filename,
               Body:data,
               ACL:'public-read'
           }
       
           s3bucket.upload(params,(err,s3response)=>{
               if(err){
                   reject(err);
               }
               else {
                   resolve (s3response);
               }
            })
    })
 }