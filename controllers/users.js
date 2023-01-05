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