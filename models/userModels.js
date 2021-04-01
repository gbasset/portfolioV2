import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserShema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    },
})

//Pré Hook - before register to mongo DB
UserShema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    user.isAdmin = false;
    next();
})

// Check password 
UserShema.methods.isValidPassword = async function (password) {
    const user = this;
    const isSame = await bcrypt.compare(password, user.password);
    return isSame;
}

const UserModel = mongoose.model('User', UserShema);
export default UserModel;