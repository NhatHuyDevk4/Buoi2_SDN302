import { generateAccessToken, generateRefreshToken } from "../middleware/jwt.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


export const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Phải mã hóa password trước khi lưu vào database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 là số lần băm, càng cao thì càng an toàn nhưng tốn thời gian hơn
        const newUser = new User(
            {
                name: name,
                email: email,
                password: hashedPassword
            }
        );
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }

    // Logic đăng ký người dùng sẽ được xử lý ở đây
    // account, password, email, phone, address, name
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Tạo JWT access token
        const accessToken = generateAccessToken(user, user.role);
        const refreshToken = generateRefreshToken(user);
        // Lưu refresh token vào database
        user.refreshToken = refreshToken;
        await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken }, { new: true });
        // { new: true } để trả về document đã được cập nhật
        // Lưu refresh token vào cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // chỉ cho phép truy cập cookie từ server
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
        })

        // Signature: dùng để xác thực token, đảm bảo token không bị thay đổi
        return res.status(200).json(
            {
                message: 'Login successful',
                accessToken: accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        );
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const refreshTokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }
    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token 1' });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY_REFRESH);

        if (user._id.toString() !== decoded.userId) {
            return res.status(403).json({ message: 'Invalid refresh token 2' });
        }

        const newAccessToken = generateAccessToken(user, user.role);
        return res.status(200).json({ success: true, accessToken: newAccessToken });

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const getCurrentUser = async (req, res) => {
    console.log('User from token:', req.user); // req.user được gán trong middleware verifyToken
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId).select('-password -refreshToken -__v'); // loại bỏ trường password và refreshToken khỏi kết quả
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user: user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
// Nhiệm vụ của refresh token là giúp người dùng lấy access token mới khi access token hết hạn mà không cần phải đăng nhập lại
// Refresh token thường có thời gian sống lâu hơn access token
// Refresh token nên được lưu trữ an toàn, không nên lưu trữ trong local storage hoặc session storage vì dễ bị tấn công XSS