import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
    value: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    label: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },

});
const Tag = mongoose.model('Tag', TagSchema);
export default Tag;
//https://dev.to/fakorededamilola/uploading-images-on-mongodb-via-nodejs-5h1l
//https://cloudinary.com/console/c-3853f6b020bd7ac3bf129bc00f8abc/media_library/folders/4434e5a3cb34b6f7a2922eb4e94777a0