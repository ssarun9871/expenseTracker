const User = require('../models/users');
const Expense = require('../models/expenses');

exports.leaderboard = async (req,res,next)=>{

    //grouping the expenses on the basis of userId with total amount of expense
    Expense.aggregate([{
        $group: {
            _id: '$UserId',
            total: { $sum: '$amount' }
        },
    }])
    //after getting userId and total expense we get names associated with the userId
    .then(async data => {
        let result = data.map(async ele => {
        let user = await User.findOne({ _id: ele._id });
        let obj = { name: user.name, total: ele.total };
        return obj;
        });
      
        Promise.all(result).then(row => {
        res.status(201).json(row.sort((a,b)=>b.total-a.total))
        });
    })
    .catch(err=>res.status(400).json({message:"unable to fetch leaderboard data",error:err}))
} 
