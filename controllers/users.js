const Users = require('../models/users');
const bcrypt = require('bcrypt');

exports.postAddUsers= (req,res,next)=>{
    let password = req.body.password;
    bcrypt.hash(password, 10).then( async (hash)=> {
        await Users.create({
            name:req.body.name,
            email:req.body.email,
            password: hash
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
    });

}


exports.postLoginUser = async (req,res,next)=>{
    let email = req.body.email;
    let passwordFromUser = req.body.password;
    let user = await Users.findByPk(email);

    //if user exists in the database
    if(user){
        let passwordFromDB = user.password
        const match = await bcrypt.compare(passwordFromUser, passwordFromDB);
        
        //if both the passwords matches
        if(match){
            res.json({status:"successful", message:"User login successful"});
        }
        //if passwords doesn't matches
        else{
            res.status(400).json({status:"failed", message:"User not authorized"});
        }
        }
    //if user doesn't exists in the database    
    else{
        res.status(404).json({status:"failed" , message:"User not found"});
        }

}