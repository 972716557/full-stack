import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    }
})
const UserModel = mongoose.model('User', UserSchema);
export const getUsers = () => UserModel.find()
export const getUserId = (id: string) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) => UserModel.create(values).then(user => user.toObject())
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id})
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, {new: true})
export const getUserByEmail = (email: string) => UserModel.findOne({email})
export default UserModel