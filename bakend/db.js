const mongoose = require('mongoose');
const connectDB = async()=>{
try{
const main = await mongoose.connect('mongodb://0.0.0.0:27017/inotebook',{
      useNewUrlParser:true,
      useUnifiedTopology:true
   });
   console.log("connected to mongodb");
}
catch(err){
   console.log(err);
}
}
module.exports = connectDB;
