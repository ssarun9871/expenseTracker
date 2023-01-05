const Users = require('../models/users');

exports.postAddUsers=async (req,res,next)=>{
    await Users.create({
       name:req.body.name,
       email:req.body.email,
       password: req.body.password
    })
    .then(result=> res.json("User added successfully"))
    .catch(err => {
        if(err.errors[0].validatorKey=="not_unique"){
            res.status(400).send("already_exist");
        }
        else {
            res.status(400).send(err);
        }
    });
}

exports.postLoginUser = async (req,res,next)=>{
    let email = req.body.email;
    let password = req.body.password;
    let user = await Users.findByPk(email);
    if(user){
        if(user.password==password){
            res.json({status:"successful", message:"User login successful"});
        }
        else{
            res.status(401).json({status:"failed", message:"User not authorized"});
           }
        }
    else{
        res.status(401).json({status:"failed" , message:"User not found"});
        }

}