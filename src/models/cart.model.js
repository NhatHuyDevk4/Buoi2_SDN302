import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // Mỗi user không phải là string mà là một ObjectId
            ref: 'user', // tham
            unique: true, // Mỗi user chỉ có một giỏ hàng
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId, // Mỗi product không phải là string mà là một ObjectId
                    ref: 'products', // tham chiếu đến collection products
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity must be at least 1'],
                    default: 1,
                }
            }
        ]
    },
    {
        timestamps: true, // Thằng này sẽ tự động tạo 2 trường createdAt và updatedAt
    }
)

const Cart = mongoose.model('carts', CartSchema)
export default Cart