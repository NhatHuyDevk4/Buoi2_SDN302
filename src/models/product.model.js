import mongoose from "mongoose";

// ODM: Object Data Modeling
// mô hình hóa dữ liệu đối tượng
// giúp thao tác với MongoDB dễ dàng hơn
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true, // loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        images: {
            url: { type: String, required: true },
            alt: { type: String },
        },
        brand: {
            type: String,
            required: true,
            trim: true,
            default: 'No brand',
        },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId, // Mỗi category không phải là string mà là một ObjectId
                // Dùng để liên kết (reference) với document trong collection categories
                ref: 'categories', // tham chiếu đến collection categories
                required: true,
            }
        ],
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            default: 0,
            min: [0, 'Product price must be positive number'], // Giá trị nhỏ nhất là 0
        },
        discount: {
            type: Number,
            default: 0,
            min: [0, 'Discount must be positive number'],
            max: [100, 'Discount must be less than or equal to 100'], // Giá trị lớn nhất là 100
        },
        stock: {
            type: Number,
            required: true,
            unique: true,
            min: [0, 'Stock must be positive number'],
            default: 0,
        },
        tags: [ // hash tags vd ["phone", "samsung", "android"]
            {
                type: String,
                trim: true,
            }
        ],
        ratings: {
            average: {
                type: Number,
                default: 0,
                min: [0, 'Rating must be positive number'],
                max: [5, 'Rating must be less than or equal to 5'],
            },
            count: {
                type: Number,
                default: 0,
            }
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId, // Mỗi category không phải là string mà là một ObjectId
            ref: 'user', // tham chiếu đến collection users
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user', // tham chiếu đến collection users
        }
    },
    {
        timestamps: true, // Thằng này sẽ tự động tạo 2 trường createdAt và updatedAt
    }
)

const Product = mongoose.model('products', ProductSchema)

export default Product

