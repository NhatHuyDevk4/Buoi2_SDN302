import mongoose from "mongoose";

// ODM: Object Data Modeling
// mô hình hóa dữ liệu đối tượng
// giúp thao tác với MongoDB dễ dàng hơn
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        avatar: {
            url: { type: String, default: '' },
            alt: { type: String, default: 'user avatar' },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        refreshToken: {
            type: String,
        },
        // isVerified: {
        //     type: Boolean,
        //     default: false,
        // }
    },
    {
        timestamps: true, // Thằng này sẽ tự động tạo 2 trường createdAt và updatedAt
    }
)

const User = mongoose.model('user', UserSchema)

export default User

