import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
        default: null
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export const Post = mongoose.model('Post', postSchema);

// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     tags: {
//         type: [String],
//         default: []
//     },
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         refPath: 'authorModel',
//         required: true
//     },
//     authorModel: {
//         type: String,
//         required: true,
//         enum: ['User', 'Organization']
//     }
// }, {
//     timestamps: true
// });

// export const Post = mongoose.model('Post', postSchema);