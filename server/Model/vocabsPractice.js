const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vocabsPracticeSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    vocabs:{
        type:Schema.Types.ObjectId,
        ref:"VocabularyMatching"
    },
    progress:{
        type:Number,
        default:0
    },
    completed:{
        type:Boolean,
        default:false
    }
},{timestamps:true});