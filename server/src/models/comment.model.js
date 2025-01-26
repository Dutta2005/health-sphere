// import mongoose from 'mongoose';

// const commentSchema = new mongoose.Schema({
//     content: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     post: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Post',
//         default: null
//     },
//     parentComment: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Comment',
//         default: null
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     likes: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     replies: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Comment'
//     }]
// }, { 
//     timestamps: true 
// });

// export const Comment = mongoose.model('Comment', commentSchema);


import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { 
    timestamps: true 
});

// Validation to ensure either user or organization is present
commentSchema.pre('validate', function(next) {
    if (!this.user && !this.organization) {
        next(new Error('Either user or organization must be specified'));
    }
    next();
});

export const Comment = mongoose.model('Comment', commentSchema);