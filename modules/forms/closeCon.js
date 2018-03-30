const mongoose = require('mongoose')

const Consumer = require(__base + 'models/consumer.js').consumer

const closureCon = (req,res) => {
  let updateOps = {}
  for (let key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Consumer.findOneAndUpdate({"ApplicationID":req.body.applicationID},{
      $set:{
        "closureOfConnection" : {
                "lastBillNumber" : req.body.billNumber,
                "lastBillAmount" : req.body.billAmount,
                "reasonOfClosure" : req.body.reason,
                "isClosureApproved" : false
        }
      },
    }, (err,data) => {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    else {
      if(!data){
        res.status(404).json({message:"no Entry Found"});
      }

      else {
        data.save((err,updatedData)=>{
          if(err) {
            console.log(err);
            res.status(500).send("Update failed");
          }
          else {
            res.status(200).json(updatedData);
            //console.log(updatedData);
          }
        });
      }// nested else finish
    }
  });
}

module.exports = closureCon