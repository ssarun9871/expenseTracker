const Expense = require('../models/expenses');
const User = require('../models/users');
const S3service = require('../services/S3services');
const Download = require('../models/download');


exports.postAddExpense=async (req,res,next)=>{
    const expense  = new Expense({
        UserId:req.body.userId,
        amount:req.body.amount,
        description:req.body.description,
        category: req.body.category,
    })
  
    expense.save() 
    .then(result=> res.status(201).json(result._id))
    .catch(err => res.status(401).json({message:'unable to add expense',error:err}));
}


exports.getDeleteExpense=async(req,res,next)=>{
    const id = req.params.id;
    Expense.findByIdAndRemove(id)
    .then(data=>{
        res.status.json({status:'expense deleted successfully'});
    })
    .catch(err=>res.status(401).json({message:'unable to delete expense',error:err}));
}


exports.getAllData = async(req,res,next)=>{
    const userId = req.body.userId
    Expense.find({UserId:userId})
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>res.status(401).json({message:'unable to get expenses',error:err}));
}


exports.checkMembership = async(req,res,next)=>{
    const userId = req.body.userId
    User.findOne({_id:userId})
    .then(async data=>{
        res.status(201).json({premium:data.isPremium,rowPreference:data.rowPreference})
    })
    .catch(err=>res.status(401).json({message:'unable to membership info',error:err}));
} 


exports.updateRowPreference = async(req,res,next)=>{
    const userId = req.body.userId;
    User.findByIdAndUpdate(userId,{rowPreference:req.params.rows},(err,result)=>{
     if(err){
        res.status(401).json({message:'unable to update row preference'});
     }
     else {
        res.status(201).json({message:'row preference saved successfullt'})
     }
    })
    .catch(err=>res.status(401).json({message:'unable to update row',error:err}));
}



exports.downloadexpense = async(req,res)=>{
    try{
    const userId = req.body.userId
    Expense.find({UserId:userId})
    .then(async data=>{
        let stringifyData = JSON.stringify(data);
        
        const filename = `Expense${userId}/${new Date()}.txt`;
        const responseFromS3 = await S3service.uploadToS3(stringifyData,filename);
        
        const download = new Download({
            UserId:req.body.userId,
            downloadlinks:responseFromS3.Location
        })

        download.save()

        res.status(200).json({fileURL:responseFromS3.Location,success:true})
        }); 
   }
 catch(err){
 res.status(400).json({fileURL:'', success:false,error:err});
 }
}
 