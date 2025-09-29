import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true, // loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi
            unique: true, // tên category không được trùng nhau
        },
        description: {
            type: String,
            trim: true,
        },
        isActvie: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, // Mỗi category không phải là string mà là một ObjectId
            ref: 'user', // tham chiếu đến collection users
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId, // Mỗi category không phải là string mà là một ObjectId
            ref: 'user', // tham chiếu đến collection users
        }
    },
    {
        timestamps: true, // Thằng này sẽ tự động tạo 2 trường createdAt và updatedAt
    }
)

const Category = mongoose.model('categories', CategorySchema)
export default Category