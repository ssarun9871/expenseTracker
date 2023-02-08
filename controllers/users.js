const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function accessToken(id,name){
    return jwt.sign({userId:id, name : name},'g98yigujkggggu98gyu');

}

exports.postAddUsers= (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10)
    .then( async (hash)=> {
        const user  = new Users({
          name: name,
          email: email,
          password: hash
         })
         
        user
        .save() 
        .then(result=> res.json("User added successfully"))
        .catch(err => {
            if(err.code==11000){
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
    let user = await Users.findOne({email:email});

    //if user exists in the database
    if(user){
        let passwordFromDB = user.password
        const match = await bcrypt.compare(passwordFromUser, passwordFromDB);
        
        //if both the passwords matches
        if(match){
            res.json({status:"successful", message:"User login successful", token:accessToken(user._id, user.name), id:user._id});
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







