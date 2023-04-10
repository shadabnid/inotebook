const mongoose= require('mongoose');

const userSchema = new Schema({
    title:{
        type:string,
        require:true
    },
    description:{
        type:string,
        require:true,
        
    },
    tag:{
        type:string,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model('Notes',userSchema);