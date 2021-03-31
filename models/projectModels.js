import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    devices: {
        type: [String],
        require: true,
    },
    links: {
        type: [String],
        require: true,
        "default": [],
    },
    description: {
        type: String,
        require: true,
        trim: true,
    },
    year: {
        type: Date,
        default: Date.now,

    },
    language: {
        type: [String],
        require: true,
        "default": [],
        validate: language => {
            if (language.length === 0) {
                throw new Error('Le tableau doit accueillir au moins un language', language);
            }
        }
    },
    tags: {
        type: [String],
        require: true,
        "default": [],
        validate: tags => {
            if (tags.length === 0) {
                throw new Error('Le tableau doit accueillir au moins un tag');
            }
        }
    },
    images: {
        type: [{
            name: String,
            url: String
        }],
    },
    imageHome: {
        type: {
            name: String,
            url: String
        },
    },
    isMainProject: {
        type: Boolean,
        default: false
    },
});
const Project = mongoose.model('Project', ProjectSchema);
export default Project;
//https://dev.to/fakorededamilola/uploading-images-on-mongodb-via-nodejs-5h1l
//https://cloudinary.com/console/c-3853f6b020bd7ac3bf129bc00f8abc/media_library/folders/4434e5a3cb34b6f7a2922eb4e94777a0