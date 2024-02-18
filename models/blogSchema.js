import mongoose, { Mongoose } from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [10,"blog title must contain a 10 characters"], 
        maxlength: [100,"blog title cannot excede more than 100 characters"], 
    },
    mainImage: {
        public_id:{
            type: String,
            required: true,
        },
        URl: {
            type: String,
            required: true,
        },
    },
    intro: {
        type: String,
        required: true,
        minlength: [250,"blog title must contain a 250 character"],
    },
    paraFirstImage:{
        public_id:{
            type: String,
           
            required: true,
        },
    },
    paraFirstDescription:{
        intro: {
            type: String,
            minlength: [50,"blog title must contain a 250 character"],
        },
    },
    paraFirstTitle:{
    type: String,
    minlength: [50,"blog title must contain a 50 character"],
    },
    paraSecondImage:{
        public_id:{
            type: String,
           
            required: true,
        },
    },
    paraSecondDescription:{
        intro: {
            type: String,
            minlength: [50,"blog title must contain a 250 character"],
        },
    },
    paraSecondTitle:{
    type: String,
    minlength: [50,"blog title must contain a 50 character"],
    },
    paraSecondImage:{
        public_id:{
            type: String, 
           
            required: true,
        },
    },
    paraSecondDescription:{
        intro: {
            type: String,
            minlength: [50,"blog title must contain a 250 character"],
        },
    },
    paraSecondTitle:{
    type: String,
    minlength: [50,"blog title must contain a 50 character"],
    },
    category:{
        type: String,
        required: true,
    },
    createdBy:{
    type: Mongoose.sechema.objectId,
    ref:"user",
    required: true,
    },
    authorName:{
    type: String,
    required: true,
    },
    authorAvat:{
    type: String,
    required: true,
    },


});
export const Blog = mongoose.model('Blog', blogSchema);