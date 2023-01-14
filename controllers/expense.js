const Expense = require('../models/expenses');
const User = require('../models/users');
const S3service = require('../services/S3services');
const download = require('../models/download');

exports.downloadexpense = async(req,res)=>{
    try{
    const userId = req.body.userId
    
    Expense.findAll({where:{userId:userId}})
    .then(async data=>{
        let stringifyData = JSON.stringify(data);
        
        const filename = `Expense${userId}/${new Date()}.txt`;
        const responseFromS3 = await S3service.uploadToS3(stringifyData,filename);
        console.log(responseFromS3)
        download.create({
            userId:userId,
            downloadlinks:responseFromS3.Location
        })

        res.status(200).json({fileURL:responseFromS3.Location,success:true});
        }); 
   }
 catch(err){
 res.status(400).json({fileURL:'', success:false,error:err});
 }
}
 

exports.postAddExpense=async (req,res,next)=>{
    
 await Expense.create({
    amount:req.body.amount,
    description:req.body.description,
    category: req.body.category,
    userId : req.body.userId
 })
 .then(result=> res.json(result.dataValues.id))//here the id is expense data id
 .catch(err => console.log(err));
}
 

exports.getDeleteExpense=async(req,res,next)=>{
    const id = req.params.id;
    Expense.findByPk(id)
    .then(data=>{
        data.destroy();
        res.json(data);
    })
}


exports.getAllData = async(req,res,next)=>{
    const userId = req.body.userId
    
    Expense.findAll({where:{userId:userId}})
    .then(data=>{
        res.json(data)
    });
}


exports.checkMembership = async(req,res,next)=>{
    const userId = req.body.userId

    User.findOne({where:{id:userId}})
    .then(data=>{
        res.json({premium:data.isPremium})
    });
} 
